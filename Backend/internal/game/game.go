package game

type Game struct {
	Player1 string
	Player2 string
	Board   [6][7]int
	Turn    int // 1 or 2
	Winner  int // 0 none, 1, 2
}

func NewGame(p1, p2 string) *Game {
	return &Game{
		Player1: p1,
		Player2: p2,
		Turn:    1,
	}
}

func (g *Game) CurrentPlayerUsername() string {
	if g.Turn == 1 {
		return g.Player1
	}
	return g.Player2
}

func (g *Game) DropDisc(col int) (bool, int) {
	if col < 0 || col > 6 {
		return false, -1
	}

	for row := 5; row >= 0; row-- {
		if g.Board[row][col] == 0 {
			g.Board[row][col] = g.Turn

			placedRow := row

			if g.Turn == 1 {
				g.Turn = 2
			} else {
				g.Turn = 1
			}

			return true, placedRow
		}
	}
	return false, -1
}
