# 🎮 4 in a Row (Connect 4)

A real-time **Connect 4 multiplayer game** built with **Go (WebSockets)** and **React**.  
Players can compete against each other or play against a bot.  
The game includes **turn enforcement, win detection, and a persistent leaderboard** stored in PostgreSQL.

---

## ✨ Features

- 🔁 Real-time gameplay using WebSockets
- 👥 Player vs Player matchmaking
- 🤖 Player vs Bot mode
- 🧠 Server-side turn validation (no cheating)
- 🏆 Persistent leaderboard (PostgreSQL)
- 🎨 Clean and interactive UI (React)
- 🔄 Play again without refreshing backend

---

## 🧱 Tech Stack

### Frontend

- React (Vite)
- JavaScript
- CSS (inline styles)

### Backend

- Go
- Gorilla WebSocket
- PostgreSQL

---

## 📂 Project Structure

```
Connect4/
│
├── backend/
│ ├── cmd/server/main.go
│ ├── internal/
│ │ ├── game/
│ │ ├── matchmaking/
│ │ ├── store/
│ │ └── websocket/
│ └── .env
│
├── Frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── pages/
│ │ └── utils/
│ └── package.json
│
└── README.md
```

---


## ⚙️ Prerequisites

Make sure you have the following installed:

- **Go** (>= 1.20)
- **Node.js** (>= 18)
- **PostgreSQL**

---

## 🗄️ Database Setup (PostgreSQL)

1. Open PostgreSQL shell:
   ```bash
   psql -U postgres
   Create database:
   ```

CREATE DATABASE connect4;
Exit:

\q
🔐 Environment Variables
Create a .env file inside the backend folder:

backend/.env
Add:

DATABASE_URL=postgres://postgres:<your_password>@localhost:5432/connect4?sslmode=disable
⚠️ Do NOT push .env to GitHub
Make sure .env is in .gitignore.

🚀 Running the Backend
cd backend
go run cmd/server/main.go
You should see:

Server running on :8080
💻 Running the Frontend
cd Frontend
npm install
npm run dev
Frontend will start at:

http://localhost:5173
🎯 How to Play
Enter a username and click Join Game

If another player joins → PvP game starts

If no player joins within a few seconds → Bot game starts

Click a column to drop your disc

First player to connect 4 discs in a row wins

🏆 Leaderboard
Stores total wins per player

Persists even after server restarts

Automatically updates after each match

📸 Screenshots
Add screenshots here (optional but recommended)

🧠 Future Improvements
Move animations

Difficulty levels for bot

Draw detection

Mobile responsiveness

Authentication

👤 Author
Anurag
Computer Science Student
Built as a full-stack real-time system project

⭐️ If you like this project
Give it a star ⭐ and feel free to fork it!

---

## 🔥 Why this README is strong

- Clear setup → no confusion
- Shows **backend + frontend mastery**
- Mentions **WebSockets + PostgreSQL** (huge plus)
- Recruiter-friendly language
- Clean structure

---

### Next smart steps (optional)

- Add screenshots
- Add a short demo GIF
- Pin this repo on GitHub
- Mention it in your resume

If you want, I can:

- review your **GitHub repo structure**
- help write **resume bullet points**
- help with **project description for LinkedIn**

Just say the word.
