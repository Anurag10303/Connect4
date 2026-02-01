package game

// BotMove chooses a column for the bot
func (g *Game) BotMove() int {
	// 1️⃣ Try to win
	for col := 0; col < 7; col++ {
		tmp := *g
		ok, row := tmp.DropDisc(col)
		if ok && tmp.CheckWinner(row, col) {
			return col
		}
	}

	// 2️⃣ Try to block opponent
	opp := g.Turn
	if opp == 1 {
		opp = 2
	} else {
		opp = 1
	}

	for col := 0; col < 7; col++ {
		tmp := *g
		tmp.Turn = opp
		ok, row := tmp.DropDisc(col)
		if ok && tmp.CheckWinner(row, col) {
			return col
		}
	}

	// 3️⃣ Fallback — center preference
	if g.Board[0][3] == 0 {
		return 3
	}

	for col := 0; col < 7; col++ {
		if g.Board[0][col] == 0 {
			return col
		}
	}

	return 0
}
