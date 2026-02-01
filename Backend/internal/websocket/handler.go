package websocket

import (
	"encoding/json"
	"log"
	"net/http"

	"connect4/internal/matchmaking"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type Message struct {
	Type     string `json:"type"`
	Username string `json:"username,omitempty"`
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

		if m.Type == "JOIN" {
			log.Println("User joined:", m.Username)
			matchmaking.Join(m.Username, conn)
		}
	}
}
