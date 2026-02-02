import { useState, useEffect, useRef } from "react";
import { createEmptyBoard } from "../utils/Board.js";

// 🔑 ENV VARS (WORKS LOCAL + PROD)
const API_URL = import.meta.env.VITE_API_URL;
const WS_URL = import.meta.env.VITE_WS_URL;

export function useGameSocket() {
  const [ws, setWs] = useState(null);
  const [username, setUsername] = useState(null);
  const [playerNo, setPlayerNo] = useState(null);
  const playerNoRef = useRef(null);

  const [gameId, setGameId] = useState(null);
  const [board, setBoard] = useState(createEmptyBoard());
  const [turn, setTurn] = useState(null);
  const [winner, setWinner] = useState(0);
  const [status, setStatus] = useState("Not connected");
  const [leaderboard, setLeaderboard] = useState({});

  /* ---------------- LEADERBOARD ---------------- */

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch(`${API_URL}/leaderboard`);
      const data = await res.json();
      setLeaderboard(data || {});
    } catch (err) {
      console.error("Leaderboard fetch failed", err);
      setLeaderboard({});
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  /* ---------------- CONNECT ---------------- */

  const connect = (name) => {
    const socket = new WebSocket(`${WS_URL}/ws`);

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

        // 🔑 HARD RESET
        setWinner(0);
        setStatus(msg.turn === msg.playerNo ? "Your turn" : "Opponent's turn");
      }

      if (msg.type === "STATE") {
        setBoard(msg.board);
        setTurn(msg.turn);
        setWinner(msg.winner);

        if (msg.winner !== 0) {
          fetchLeaderboard();
          setStatus(
            msg.winner === playerNoRef.current ? "You won!" : "You lost!",
          );
        } else {
          setStatus(
            msg.turn === playerNoRef.current ? "Your turn" : "Opponent's turn",
          );
        }
      }
    };

    socket.onerror = () => {
      setStatus("WebSocket error");
    };

    setWs(socket);
  };

  /* ---------------- MOVE ---------------- */

  const makeMove = (column) => {
    if (!ws || !gameId || winner !== 0) return;
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
    isMyTurn: gameId && turn === playerNo,
    leaderboard,
    connect,
    makeMove,
  };
}
