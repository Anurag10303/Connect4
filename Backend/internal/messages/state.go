package messages

type StateMessage struct {
	Type   string    `json:"type"`
	Board  [6][7]int `json:"board"`
	Turn   int       `json:"turn"`
	Winner int       `json:"winner"`
}
