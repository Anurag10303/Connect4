package main

import (
	"encoding/json"
	"log"
	"net/http"

	"connect4/internal/store"
	"connect4/internal/websocket"
)

func main() {
	store.InitDB() // 🔑 REQUIRED

	http.HandleFunc("/ws", websocket.HandleWS)
	http.HandleFunc("/leaderboard", leaderboardHandler)

	log.Println("Server running on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func leaderboardHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	data, err := store.GetLeaderboard()
	if err != nil {
		http.Error(w, "Failed to load leaderboard", 500)
		return
	}

	json.NewEncoder(w).Encode(data)
}
