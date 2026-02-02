import Cell from "./Cell";

export default function Board({
  board,
  onColumnClick,
  disabled,
  hoverCol,
  setHoverCol,
  turn,
}) {
  return (
    <div
      style={{
        display: "inline-block",
        padding: 12,
        background: "#1976d2", // classic Connect-4 blue
        borderRadius: 8,
        opacity: disabled ? 0.45 : 1,
        pointerEvents: disabled ? "none" : "auto",
        transition: "opacity 0.25s ease",
      }}
    >
      {board.map((row, r) => (
        <div key={r} style={{ display: "flex" }}>
          {row.map((cell, c) => {
            const columnFull = board[0][c] !== 0;
            const clickable = r === 0 && !disabled && !columnFull;

            return (
              <Cell
                key={c}
                value={cell}
                clickable={clickable}
                preview={clickable && hoverCol === c ? turn : null}
                onClick={() => onColumnClick(c)}
                onMouseEnter={() => setHoverCol(c)}
                onMouseLeave={() => setHoverCol(null)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
