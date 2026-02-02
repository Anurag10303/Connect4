export default function Cell({
  value,
  clickable,
  onClick,
  onMouseEnter,
  onMouseLeave,
  preview,
}) {
  let discColor = "#e0e0e0"; // empty hole

  if (value === 1) discColor = "#e53935"; // red
  if (value === 2) discColor = "#fbc02d"; // yellow

  // hover preview
  if (value === 0 && preview) {
    discColor =
      preview === 1 ? "rgba(229,57,53,0.45)" : "rgba(251,192,45,0.45)";
  }

  return (
    <div
      onClick={clickable ? onClick : undefined}
      onMouseEnter={clickable ? onMouseEnter : undefined}
      onMouseLeave={clickable ? onMouseLeave : undefined}
      style={{
        width: 64,
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: clickable ? "pointer" : "default",
      }}
    >
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: "50%",
          background: discColor,
          boxShadow:
            value !== 0
              ? "inset 0 0 6px rgba(0,0,0,0.35)"
              : "inset 0 0 4px rgba(0,0,0,0.2)",
          transition: "background 0.2s ease",
        }}
      />
    </div>
  );
}
