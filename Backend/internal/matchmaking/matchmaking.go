package matchmaking

import (
	"log"
	"sync"
	"time"

	"connect4/internal/game"
	"connect4/internal/store"
	"connect4/internal/messages"

	"github.com/google/uuid"
	"github.com/gorilla/websocket"
)

type WaitingPlayer struct {
	Username string
	Conn     *websocket.Conn
	Timer    *time.Timer
}

var (
	mu      sync.Mutex
	waiting *WaitingPlayer
)

func Join(username string, conn *websocket.Conn) {
	mu.Lock()
	defer mu.Unlock()

	// No waiting player → put this one in queue
	if waiting == nil {
		log.Println("No waiting player, putting in queue:", username)

		timer := time.NewTimer(10 * time.Second)

		waiting = &WaitingPlayer{
			Username: username,
			Conn:     conn,
			Timer:    timer,
		}

		go func(p *WaitingPlayer) {
			<-p.Timer.C
			startBotGame(p)
		}(waiting)

		return
	}

	// Match found
	log.Println("Match found:", waiting.Username, "vs", username)

	waiting.Timer.Stop()

	p1 := waiting
	p2 := &WaitingPlayer{
		Username: username,
		Conn:     conn,
	}

	waiting = nil
	startPlayerGame(p1, p2)
}

func startPlayerGame(p1, p2 *WaitingPlayer) {
	gameID := uuid.NewString()

	g := game.NewGame(p1.Username, p2.Username)
	store.SaveGame(gameID, g)

	store.AddConn(gameID, p1.Conn)
	store.AddConn(gameID, p2.Conn)

	startMsg := messages.StartMessage{
		Type:   "START",
		GameID: gameID,
		Board:  g.Board,
		Turn:   g.Turn,
	}

	p1.Conn.WriteJSON(startMsg)
	p2.Conn.WriteJSON(startMsg)

	log.Println("Player game started:", gameID)
}

func startBotGame(p *WaitingPlayer) {
	mu.Lock()
	defer mu.Unlock()

	// Player already matched
	if waiting == nil || waiting.Username != p.Username {
		return
	}

	waiting = nil

	gameID := uuid.NewString()

	g := game.NewGame(p.Username, "BOT")
	store.SaveGame(gameID, g)
	store.AddConn(gameID, p.Conn)

	startMsg := messages.StartMessage{
		Type:   "START",
		GameID: gameID,
		Board:  g.Board,
		Turn:   g.Turn,
	}

	p.Conn.WriteJSON(startMsg)

	log.Println("Bot game started:", gameID)
}
