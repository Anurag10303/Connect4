package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"

	"connect4/internal/store"
	"connect4/internal/websocket"
)

func main() {
	// 🔑 Init DB (Postgres)
	store.InitDB()

	// Routes
	http.HandleFunc("/ws", websocket.HandleWS)
	http.HandleFunc("/leaderboard", leaderboardHandler)

	// 🔑 Use PORT from env (Railway requirement)
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // local fallback
	}

	log.Println("Server running on :" + port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
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
