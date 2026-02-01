package store

import (
	"sync"

	"connect4/internal/game"
)

var (
	gameMu sync.Mutex
	games  = make(map[string]*game.Game)
)

func SaveGame(id string, g *game.Game) {
	gameMu.Lock()
	defer gameMu.Unlock()
	games[id] = g
}

func GetGame(id string) (*game.Game, bool) {
	gameMu.Lock()
	defer gameMu.Unlock()
	g, ok := games[id]
	return g, ok
}
