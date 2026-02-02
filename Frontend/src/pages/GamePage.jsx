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
    <div
      style={{
        padding: 20,
        maxWidth: 520,
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: 32,
          letterSpacing: 1,
          marginBottom: 4,
        }}
      >
        4 in a Row
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#666",
          marginBottom: 18,
          fontSize: 14,
        }}
      >
        Connect four discs to win
      </p>

      {/* 🟢 WIN / 🔴 LOSS BANNER */}
      {game.winner && (
        <div
          style={{
            padding: "14px 16px",
            marginBottom: 16,
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
            style={{ padding: 6, fontSize: 14 }}
          />
          <button onClick={() => game.connect(username)}>Join Game</button>
        </div>
      )}

      {/* STATUS TEXT */}
      <Status text={game.status} />

      {/* TURN INDICATOR */}
      {game.gameId && !game.winner && (
        <div
          style={{
            margin: "10px 0",
            textAlign: "center",
            fontWeight: "bold",
            color: game.isMyTurn ? "#2e7d32" : "#555",
          }}
        >
          {game.isMyTurn ? "🟢 Your turn" : "⏳ Waiting for opponent"}
        </div>
      )}

      {/* BOARD (FADED WHEN NOT YOUR TURN) */}
      <div
        style={{
          opacity: !game.gameId || game.winner || game.isMyTurn ? 1 : 0.6,
          transition: "opacity 0.2s ease",
          pointerEvents:
            !game.gameId || game.winner || game.isMyTurn ? "auto" : "none",
        }}
      >
        <Board
          board={game.board}
          onColumnClick={game.makeMove}
          disabled={!game.gameId || game.winner || !game.isMyTurn}
          hoverCol={hoverCol}
          setHoverCol={setHoverCol}
          turn={game.turn}
        />
      </div>

      {/* NEW GAME */}
      {game.gameId && game.winner && (
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "8px 16px",
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            New Game
          </button>
        </div>
      )}

      {/* LEADERBOARD */}
      <div style={{ marginTop: 28 }}>
        <Leaderboard data={game.leaderboard} />
      </div>
    </div>
  );
}
