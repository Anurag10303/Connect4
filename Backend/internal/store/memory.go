package store

import (
	"sync"

	"connect4/internal/game"
)

var (
	mu    sync.Mutex
	games = make(map[string]*game.Game)
)

func SaveGame(id string, g *game.Game) {
	mu.Lock()
	defer mu.Unlock()
	games[id] = g
}

func GetGame(id string) (*game.Game, bool) {
	mu.Lock()
	defer mu.Unlock()
	g, ok := games[id]
	return g, ok
}
