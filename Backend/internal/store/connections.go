package store

import (
	"sync"

	"github.com/gorilla/websocket"
)

var (
	connMu sync.Mutex
	conns  = make(map[string][]*websocket.Conn)
)

func AddConn(gameID string, conn *websocket.Conn) {
	connMu.Lock()
	defer connMu.Unlock()
	conns[gameID] = append(conns[gameID], conn)
}

func GetConns(gameID string) []*websocket.Conn {
	connMu.Lock()
	defer connMu.Unlock()
	return conns[gameID]
}
