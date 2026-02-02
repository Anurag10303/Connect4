export default function Leaderboard({ data }) {
  if (!data) {
    return <p>Loading leaderboard...</p>;
  }

  const entries = Object.entries(data);

  return (
    <div style={{ marginTop: 24 }}>
      <h3>Leaderboard</h3>

      {entries.length === 0 ? (
        <p>No games played yet</p>
      ) : (
        <table border="1" cellPadding="6">
          <thead>
            <tr>
              <th>Player</th>
              <th>Wins</th>
            </tr>
          </thead>
          <tbody>
            {entries
              .sort((a, b) => b[1] - a[1])
              .map(([name, wins]) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>{wins}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
