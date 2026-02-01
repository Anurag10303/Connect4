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
    <div>
      {board.map((row, r) => (
        <div key={r} style={{ display: "flex" }}>
          {row.map((cell, c) => {
            const columnFull = board[0][c] !== 0;
            const clickable =
              r === 0 && !disabled && !columnFull;

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
