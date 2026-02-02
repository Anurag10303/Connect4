import { useState, useEffect, useRef } from "react";
import { createEmptyBoard } from "../utils/Board.js";

export function useGameSocket() {
  const [ws, setWs] = useState(null);
  const [username, setUsername] = useState(null);
  const [playerNo, setPlayerNo] = useState(null);
  const playerNoRef = useRef(null);
  const [gameId, setGameId] = useState(null);
  const [board, setBoard] = useState(createEmptyBoard());
  const [turn, setTurn] = useState(null);
  const [winner, setWinner] = useState(null);
  const [status, setStatus] = useState("Not connected");
  const [leaderboard, setLeaderboard] = useState({});

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch("http://localhost:8080/leaderboard");
      const data = await res.json();
      setLeaderboard(data);
    } catch (err) {
      console.error("Leaderboard fetch failed", err);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const connect = (name) => {
    const socket = new WebSocket("ws://localhost:8080/ws");

    socket.onopen = () => {
      setUsername(name);
      setStatus("Waiting for opponent or bot...");
      socket.send(JSON.stringify({ type: "JOIN", username: name }));
    };

    socket.onmessage = (e) => {
      const msg = JSON.parse(e.data);

      if (msg.type === "START") {
        setGameId(msg.gameId);
        setBoard(msg.board);
        setTurn(msg.turn);
        setPlayerNo(msg.playerNo);
        playerNoRef.current = msg.playerNo;
        setWinner(null);
        setStatus(msg.turn === msg.playerNo ? "Your turn" : "Opponent’s turn");
      }

      if (msg.type === "STATE") {
        setBoard(msg.board);
        setTurn(msg.turn);
        setWinner(msg.winner);

        if (msg.winner) {
          fetchLeaderboard();
          setStatus(
            msg.winner === playerNoRef.current
              ? "🎉 Game Over — You Won!"
              : "💀 Game Over — You Lost",
          );
        } else {
          setStatus(
            msg.turn === playerNoRef.current ? "Your turn" : "Opponent’s turn",
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
    if (!ws || !gameId || winner) return;
    if (turn !== playerNoRef.current) return;

    ws.send(
      JSON.stringify({
        type: "MOVE",
        gameId,
        column,
        username,
      }),
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
    isMyTurn: turn === playerNo,
    leaderboard,
    connect,
    makeMove,
  };
}
