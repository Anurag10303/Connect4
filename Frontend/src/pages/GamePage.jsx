import { useState } from "react";
import { useGameSocket } from "../hooks/useGameSocket";
import Board from "../components/Board";
import Status from "../components/Status";

export default function GamePage() {
  const [username, setUsername] = useState("");
  const [hoverCol, setHoverCol] = useState(null);

  const game = useGameSocket();

  const startNewGame = () => {
    window.location.reload();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>4 in a Row</h1>

      {!game.gameId && (
        <div style={{ marginBottom: 12 }}>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            onClick={() => game.connect(username)}
            style={{ marginLeft: 8 }}
          >
            Join Game
          </button>
        </div>
      )}

      <Status text={game.status} />

      <Board
        board={game.board}
        onColumnClick={game.makeMove}
        disabled={!game.gameId || game.winner}
        hoverCol={hoverCol}
        setHoverCol={setHoverCol}
        turn={game.turn}
      />

      {game.turn && !game.winner && (
        <p style={{ marginTop: 10 }}>
          {game.turn === 1 ? "Your turn (X)" : "Opponent's turn (O)"}
        </p>
      )}

      {game.gameId && (
        <button
          onClick={startNewGame}
          style={{
            marginTop: 15,
            padding: "8px 16px",
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          New Game
        </button>
      )}

      <div style={{ marginTop: 12 }}>
        <strong>Legend:</strong>{" "}
        <span style={{ color: "#e53935", marginLeft: 8 }}>X = Player 1</span>{" "}
        <span style={{ color: "#fbc02d", marginLeft: 8 }}>O = Player 2</span>
      </div>
    </div>
  );
}
