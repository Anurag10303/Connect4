package messages

type StartMessage struct {
	Type   string    `json:"type"`
	GameID string    `json:"gameId"`
	Board  [6][7]int `json:"board"`
	Turn   int       `json:"turn"`
}
