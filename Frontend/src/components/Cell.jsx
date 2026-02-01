export default function Cell({
  value,
  clickable,
  onClick,
  onMouseEnter,
  onMouseLeave,
  preview,
}) {
  let bg = "#f5f5f5";
  let text = "";

  // committed moves
  if (value === 1) {
    bg = "#e53935"; // red
    text = "X";
  } else if (value === 2) {
    bg = "#fbc02d"; // yellow
    text = "O";
  }

  // hover preview (ghost disc)
  if (value === 0 && preview) {
    bg =
      preview === 1
        ? "rgba(229,57,53,0.4)"
        : "rgba(251,192,45,0.4)";
    text = preview === 1 ? "X" : "O";
  }

  return (
    <div
      onClick={clickable ? onClick : undefined}
      onMouseEnter={clickable ? onMouseEnter : undefined}
      onMouseLeave={clickable ? onMouseLeave : undefined}
      style={{
        width: 56,
        height: 56,
        border: "2px solid #333",
        background: bg,
        cursor: clickable ? "pointer" : "not-allowed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 26,
        fontWeight: "bold",
        color: "#222",
        userSelect: "none",
      }}
    >
      {text}
    </div>
  );
}
