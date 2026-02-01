package game

func (g *Game) BotMove() int {
	// Try to win
	for col := 0; col < 7; col++ {
		tmp := *g
		ok, row := tmp.DropDisc(col)
		if ok && tmp.CheckWinner(row, col) {
			return col
		}
	}

	// Try to block opponent
	opp := 1
	if g.Turn == 1 {
		opp = 2
	}

	for col := 0; col < 7; col++ {
		tmp := *g
		tmp.Turn = opp
		ok, row := tmp.DropDisc(col)
		if ok && tmp.CheckWinner(row, col) {
			return col
		}
	}

	// Prefer center
	if g.Board[0][3] == 0 {
		return 3
	}

	// Fallback
	for col := 0; col < 7; col++ {
		if g.Board[0][col] == 0 {
			return col
		}
	}

	return 0
}
