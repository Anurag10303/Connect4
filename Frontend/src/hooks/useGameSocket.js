import { useState } from "react";
import { createEmptyBoard } from "../utils/Board.js";

export function useGameSocket() {
  const [ws, setWs] = useState(null);
  const [username, setUsername] = useState(null);
  const [playerNo, setPlayerNo] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [board, setBoard] = useState(createEmptyBoard());
  const [turn, setTurn] = useState(null);
  const [winner, setWinner] = useState(null);
  const [status, setStatus] = useState("Not connected");

  const connect = (name) => {
    const socket = new WebSocket("ws://localhost:8080/ws");

    socket.onopen = () => {
      setUsername(name);
      setStatus("Waiting for opponent or bot...");
      socket.send(JSON.stringify({ type: "JOIN", username: name }));
    };

    socket.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      console.log("FROM SERVER:", msg);

      if (msg.type === "START") {
        setGameId(msg.gameId);
        setBoard(msg.board);
        setTurn(msg.turn);
        setPlayerNo(msg.playerNo); // 🔑 CRITICAL
        setWinner(null);
        setStatus(
          msg.turn === msg.playerNo
            ? "Your turn"
            : "Opponent's turn"
        );
      }

      if (msg.type === "STATE") {
        setBoard(msg.board);
        setTurn(msg.turn);
        setWinner(msg.winner);

        if (msg.winner) {
          setStatus(
            msg.winner === playerNo
              ? "You won!"
              : "You lost!"
          );
        } else {
          setStatus(
            msg.turn === playerNo
              ? "Your turn"
              : "Opponent's turn"
          );
        }
      }
    };

    socket.onerror = () => {
      setStatus("WebSocket error");
    };

    setWs(socket);
  };

  const makeMove = (column) => {
    // 🔒 HARD GUARDS
    if (!ws || !gameId || winner) return;
    if (!username) return;
    if (turn !== playerNo) return; // 🔑 PREVENT ILLEGAL MOVES

    console.log("SENDING MOVE:", column);

    ws.send(
      JSON.stringify({
        type: "MOVE",
        gameId,
        column,
        username,
      })
    );
  };

  return {
    board,
    turn,
    winner,
    status,
    gameId,
    username,
    playerNo,
    isMyTurn: turn === playerNo, // 🔑 EXPOSE THIS
    connect,
    makeMove,
  };
}
