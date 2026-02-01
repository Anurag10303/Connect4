package main

import (
	"log"
	"net/http"

	"connect4/internal/websocket"
)

func main() {
	http.HandleFunc("/ws", websocket.HandleWS)

	log.Println("Server running on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
