package websocket

import (
	"encoding/json"
	"net/http"
	"time"

	"connect4/internal/game"
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
		return
	}
	defer conn.Close()

	for {
		_, msg, err := conn.ReadMessage()
		if err != nil {
			return
		}

		var m Message
		if err := json.Unmarshal(msg, &m); err != nil {
			continue
		}

		switch m.Type {
		case "JOIN":
			matchmaking.Join(m.Username, conn)

		case "MOVE":
			handleMove(m)
		}
	}
}

func handleMove(m Message) {
	g, ok := store.GetGame(m.GameID)
	if !ok || g.Winner != 0 {
		return
	}

	if m.Username != g.CurrentPlayerUsername() {
		return
	}

	okMove, row := g.DropDisc(m.Column)
	if !okMove {
		return
	}

	g.CheckWinner(row, m.Column)
	broadcastState(m.GameID, g)

	if g.Winner != 0 {
		updateLeaderboard(g)
		return
	}

	if g.Player2 == "BOT" && g.Turn == 2 {
		time.AfterFunc(500*time.Millisecond, func() {
			handleBotMove(m.GameID)
		})
	}
}

func handleBotMove(gameID string) {
	g, ok := store.GetGame(gameID)
	if !ok || g.Winner != 0 || g.Turn != 2 {
		return
	}

	col := g.BotMove()
	okMove, row := g.DropDisc(col)
	if !okMove {
		return
	}

	g.CheckWinner(row, col)
	broadcastState(gameID, g)

	if g.Winner != 0 {
		updateLeaderboard(g)
	}
}

func broadcastState(gameID string, g *game.Game) {
	state := StateMessage{
		Type:   "STATE",
		Board:  g.Board,
		Turn:   g.Turn,
		Winner: g.Winner,
	}

	for _, c := range store.GetConns(gameID) {
		_ = c.WriteJSON(state)
	}
}

func updateLeaderboard(g *game.Game) {
	var winner string
	if g.Winner == 1 {
		winner = g.Player1
	} else if g.Winner == 2 {
		winner = g.Player2
	}

	if winner != "" && winner != "BOT" {
		_ = store.AddWin(winner)
	}
}
