package store

// Increment win count atomically
func AddWin(username string) error {
	_, err := DB.Exec(`
		INSERT INTO leaderboard (username, wins)
		VALUES ($1, 1)
		ON CONFLICT (username)
		DO UPDATE SET wins = leaderboard.wins + 1
	`, username)

	return err
}

// Fetch leaderboard
func GetLeaderboard() (map[string]int, error) {
	rows, err := DB.Query(`SELECT username, wins FROM leaderboard`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	result := make(map[string]int)

	for rows.Next() {
		var username string
		var wins int
		if err := rows.Scan(&username, &wins); err != nil {
			return nil, err
		}
		result[username] = wins
	}

	return result, nil
}
