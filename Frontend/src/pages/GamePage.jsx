import { useState } from "react";
import { useGameSocket } from "../hooks/useGameSocket";
import Board from "../components/Board";
import Status from "../components/Status";
import Leaderboard from "../components/Leaderboard";

export default function GamePage() {
  const [username, setUsername] = useState("");
  const [hoverCol, setHoverCol] = useState(null);
  const game = useGameSocket();

  const isWin =
    game.gameId && game.winner !== 0 && game.winner === game.playerNo;

  const isLoss =
    game.gameId && game.winner !== 0 && game.winner !== game.playerNo;

  return (
    <div
      style={{
        padding: 20,
        maxWidth: 520,
        margin: "0 auto",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", fontSize: 32, marginBottom: 4 }}>
        4 in a Row
      </h1>

      <p style={{ textAlign: "center", color: "#666", marginBottom: 18 }}>
        Connect four discs to win
      </p>

      {/* 🏆 RESULT BANNER */}
      {game.gameId && game.winner !== 0 && (
        <div
          style={{
            padding: "14px",
            marginBottom: 16,
            borderRadius: 10,
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
            color: "white",
            background: isWin ? "#2e7d32" : "#c62828",
            boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
          }}
        >
          {isWin ? "🎉 YOU WON THE GAME!" : "💀 YOU LOST THE GAME"}
        </div>
      )}

      {/* JOIN */}
      {!game.gameId && (
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 16,
            justifyContent: "center",
          }}
        >
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: 6 }}
          />
          <button onClick={() => game.connect(username)}>Join Game</button>
        </div>
      )}

      <Status text={game.status} />

      {/* TURN INDICATOR */}
      {game.gameId && game.winner === 0 && (
        <div
          style={{
            textAlign: "center",
            marginBottom: 10,
            fontWeight: "bold",
            color: game.isMyTurn ? "#2e7d32" : "#555",
          }}
        >
          {game.isMyTurn ? "🟢 Your turn" : "⏳ Waiting for opponent"}
        </div>
      )}

      {/* BOARD WRAPPER */}
      <div
        style={{
          margin: "0 auto",
          width: "fit-content",
          background: "#0d47a1",
          padding: 14,
          borderRadius: 12,
          boxShadow: "0 10px 24px rgba(0,0,0,0.25)",
          opacity: game.isMyTurn || game.winner !== 0 ? 1 : 0.6,
          pointerEvents: game.isMyTurn || game.winner !== 0 ? "auto" : "none",
        }}
      >
        <Board
          board={game.board}
          onColumnClick={game.makeMove}
          disabled={!game.isMyTurn || game.winner !== 0}
          hoverCol={hoverCol}
          setHoverCol={setHoverCol}
          turn={game.turn}
        />
      </div>

      {/* NEW GAME */}
      {game.gameId && game.winner !== 0 && (
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <button onClick={() => window.location.reload()}>New Game</button>
        </div>
      )}

      <div style={{ marginTop: 28 }}>
        <Leaderboard data={game.leaderboard} />
      </div>
    </div>
  );
}
