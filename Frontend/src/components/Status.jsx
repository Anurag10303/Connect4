export default function Status({ text }) {
  // Prevent rendering numbers / empty values
  if (!text || typeof text !== "string") return null;

  return (
    <p
      style={{
        textAlign: "center",
        fontWeight: "bold",
        margin: "6px 0",
      }}
    >
      {text}
    </p>
  );
}
