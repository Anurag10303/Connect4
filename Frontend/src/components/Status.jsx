export default function Status({ text }) {
  if (!text) return null;

  return (
    <p
      style={{
        textAlign: "center",
        margin: "8px 0",
        fontWeight: 600,
        color: "#444",
      }}
    >
      {text}
    </p>
  );
}
