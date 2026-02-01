package websocket

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"connect4/internal/matchmaking"
	"connect4/internal/store"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

type Message struct {
	Type     string `json:"type"`
	Username string `json:"username,omitempty"`
	GameID   string `json:"gameId,omitempty"`
	Column   int    `json:"column,omitempty"`
}

type StateMessage struct {
	Type   string    `json:"type"`
	Board  [6][7]int `json:"board"`
	Turn   int       `json:"turn"`
	Winner int       `json:"winner"`
}

func HandleWS(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("upgrade error:", err)
		return
	}
	defer conn.Close()

	log.Println("client connected")

	for {
		_, msg, err := conn.ReadMessage()
		if err != nil {
			log.Println("read error:", err)
			return
		}

		var m Message
		if err := json.Unmarshal(msg, &m); err != nil {
			log.Println("invalid json")
			continue
		}

		switch m.Type {

		case "JOIN":
			log.Println("User joined:", m.Username)
			matchmaking.Join(m.Username, conn)

		case "MOVE":
			g, ok := store.GetGame(m.GameID)
			if !ok {
				log.Println("invalid game id")
				continue
			}

			// 🔒 Enforce turn
			if m.Username != g.CurrentPlayerUsername() {
				log.Println("Rejected move: not player's turn")
				continue
			}

			okMove, row := g.DropDisc(m.Column)
			if !okMove {
				log.Println("Invalid move:", m.Column)
				continue
			}

			g.CheckWinner(row, m.Column)

			// 🔊 Broadcast HUMAN move
			humanState := StateMessage{
				Type:   "STATE",
				Board:  g.Board,
				Turn:   g.Turn,
				Winner: g.Winner,
			}

			for _, c := range store.GetConns(m.GameID) {
				c.WriteJSON(humanState)
			}

			// 🤖 BOT MOVE (ASYNC + DELAY)
			if g.Player2 == "BOT" && g.Turn == 2 && g.Winner == 0 {

				go func(gameID string) {
					// small delay so UI can render human move
					time.Sleep(500 * time.Millisecond)

					botCol := g.BotMove()
					okBot, botRow := g.DropDisc(botCol)
					if !okBot {
						return
					}

					g.CheckWinner(botRow, botCol)

					botState := StateMessage{
						Type:   "STATE",
						Board:  g.Board,
						Turn:   g.Turn,
						Winner: g.Winner,
					}

					for _, c := range store.GetConns(gameID) {
						c.WriteJSON(botState)
					}

					log.Println("BOT MOVE SENT:", botCol)
				}(m.GameID)
			}
		}
	}
}
