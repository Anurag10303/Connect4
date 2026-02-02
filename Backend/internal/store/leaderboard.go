package store

import "sync"

var (
	leaderboardMu sync.Mutex
	leaderboard   = make(map[string]int)
)

func AddWin(username string) {
	leaderboardMu.Lock()
	defer leaderboardMu.Unlock()
	leaderboard[username]++
}

func GetLeaderboard() map[string]int {
	leaderboardMu.Lock()
	defer leaderboardMu.Unlock()

	// return a copy (important)
	copy := make(map[string]int)
	for k, v := range leaderboard {
		copy[k] = v
	}
	return copy
}
