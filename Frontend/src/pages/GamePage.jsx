import { useState } from "react";
import { useGameSocket } from "../hooks/useGameSocket";
import Board from "../components/Board";
import Status from "../components/Status";
import Leaderboard from "../components/Leaderboard";

export default function GamePage() {
  const [username, setUsername] = useState("");
  const [hoverCol, setHoverCol] = useState(null);
  const game = useGameSocket();

  const isWin = game.winner && game.winner === game.playerNo;
  const isLoss = game.winner && game.winner !== game.playerNo;

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "0 auto" }}>
      <h1>4 in a Row</h1>

      {/* 🔴 WIN / LOSS BANNER */}
      {game.winner && (
        <div
          style={{
            padding: "14px 16px",
            marginBottom: 14,
            borderRadius: 8,
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
            color: "white",
            background: isWin ? "#2e7d32" : "#c62828",
          }}
        >
          {isWin ? "🎉 YOU WON THE GAME!" : "💀 YOU LOST THE GAME"}
        </div>
      )}

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
        disabled={!game.gameId || game.winner || !game.isMyTurn}
        hoverCol={hoverCol}
        setHoverCol={setHoverCol}
        turn={game.turn}
      />

      {game.gameId && (
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: 16,
            padding: "8px 16px",
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          New Game
        </button>
      )}

      <Leaderboard data={game.leaderboard} />
    </div>
  );
}
