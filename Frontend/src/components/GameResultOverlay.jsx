export default function GameResultOverlay({ winner, playerNo, onNewGame }) {
  if (!winner) return null;

  const isWin = winner === playerNo;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.65)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "white",
          padding: "32px 40px",
          borderRadius: 10,
          textAlign: "center",
          minWidth: 280,
        }}
      >
        <h1
          style={{
            marginBottom: 12,
            color: isWin ? "#2e7d32" : "#c62828",
          }}
        >
          {isWin ? "🎉 You Won!" : "💀 You Lost"}
        </h1>

        <p style={{ marginBottom: 24, fontSize: 16 }}>
          {isWin
            ? "Great game! Your strategy paid off."
            : "Better luck next time."}
        </p>

        <button
          onClick={onNewGame}
          style={{
            padding: "10px 18px",
            fontSize: 14,
            background: isWin ? "#2e7d32" : "#c62828",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Start New Game
        </button>
      </div>
    </div>
  );
}
