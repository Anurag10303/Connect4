package game

func (g *Game) CheckWinner(row, col int) bool {
	player := g.Board[row][col]
	if player == 0 {
		return false
	}

	directions := [][]int{
		{0, 1},  // horizontal
		{1, 0},  // vertical
		{1, 1},  // diagonal ↘
		{1, -1}, // diagonal ↗
	}

	for _, d := range directions {
		count := 1

		// forward
		r, c := row+d[0], col+d[1]
		for r >= 0 && r < 6 && c >= 0 && c < 7 && g.Board[r][c] == player {
			count++
			r += d[0]
			c += d[1]
		}

		// backward
		r, c = row-d[0], col-d[1]
		for r >= 0 && r < 6 && c >= 0 && c < 7 && g.Board[r][c] == player {
			count++
			r -= d[0]
			c -= d[1]
		}

		if count >= 4 {
			g.Winner = player
			return true
		}
	}

	return false
}
