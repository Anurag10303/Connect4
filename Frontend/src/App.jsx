import { useState } from "react";

function App() {
  const [ws, setWs] = useState(null);
  const [username, setUsername] = useState("");
  const [gameId, setGameId] = useState(null);
  const [board, setBoard] = useState(Array(6).fill(Array(7).fill(0)));
  const [turn, setTurn] = useState(null);
  const [winner, setWinner] = useState(null);

  const connect = () => {
    const socket = new WebSocket("ws://localhost:8080/ws");

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "JOIN", username }));
    };

    socket.onmessage = (e) => {
      const msg = JSON.parse(e.data);

      if (msg.type === "START") {
        setGameId(msg.gameId);
        setBoard(msg.board);
        setTurn(msg.turn);
        setWinner(null);
      }

      if (msg.type === "STATE") {
        setBoard(msg.board);
        setTurn(msg.turn);
        setWinner(msg.winner);
      }
    };

    setWs(socket);
  };

  const makeMove = (col) => {
    if (!ws || !gameId || winner) return;

    ws.send(
      JSON.stringify({
        type: "MOVE",
        gameId,
        column: col,
      }),
    );
  };

  return (
    <div style={{ padding: 20 }}>
      {!ws && (
        <>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={connect}>Join Game</button>
        </>
      )}

      {board && (
        <div style={{ marginTop: 20 }}>
          {board.map((row, r) => (
            <div key={r} style={{ display: "flex" }}>
              {row.map((cell, c) => (
                <div
                  key={c}
                  onClick={r === 0 ? () => makeMove(c) : undefined}
                  style={{
                    width: 50,
                    height: 50,
                    border: "1px solid black",
                    background:
                      cell === 0 ? "white" : cell === 1 ? "red" : "yellow",
                    cursor: r === 0 ? "pointer" : "default",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      )}

      {winner && <h2>Winner: Player {winner}</h2>}
    </div>
  );
}

export default App;
