# 🎮 Connect4 – Real-Time Multiplayer Game

A real-time Connect 4 game built with Go (WebSockets) and React (Vite).
Supports player vs player, player vs bot, and a persistent leaderboard backed by PostgreSQL.

## 🚀 Live Demo:

#### Frontend: https://connect4-hazel-ten.vercel.app/

#### Backend: https://connect4-production-d2c5.up.railway.app

## ✨ Features

🔴 Real-time gameplay using WebSockets

🤖 Bot opponent if no player joins

🏆 Persistent leaderboard (PostgreSQL)

🔄 Auto matchmaking

🌐 Fully deployed (Railway + Vercel)

📱 Responsive & clean UI

## 🛠 Tech Stack
### 1. Frontend

• React (Vite)

• WebSockets

• JavaScript

• HTML / CSS

### 2. Backend

• Go (Golang)

• Gorilla WebSocket

• PostgreSQL

• Railway (deployment)

## 📁 Project Structure

```
Connect4/
├── backend/
│   ├── cmd/server/main.go
│   ├── internal/
│   │   ├── websocket/
│   │   ├── matchmaking/
│   │   ├── game/
│   │   └── store/
│   └── go.mod
│
├── frontend/
│   ├── src/
│   │   ├── hooks/
│   │   ├── components/
│   │   └── pages/
│   └── vite.config.js
│
└── README.md
```

## ⚙️ Environment Variables
### 1. Backend (Railway)

1. Set the following variable in Railway → Variables:
```
DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/DBNAME
```

### 2. Frontend (Vercel)

1. Set these variables in Vercel → Environment Variables:
```
VITE_API_URL=https://connect4-production-d2c5.up.railway.app
VITE_WS_URL=wss://connect4-production-d2c5.up.railway.app
```
⚠️ wss:// is mandatory for WebSockets over HTTPS.

## 🧑‍💻 Run Locally
#### 1️⃣ Backend
```
cd backend
go mod tidy
go run cmd/server/main.go
```
##### Backend runs at:
```
http://localhost:8080
```
### 2️⃣ Frontend
```
cd frontend
npm install
npm run dev
```
##### Frontend runs at:
```
http://localhost:5173
```
#### Local .env (Frontend)

##### Create frontend/.env:
```
VITE_API_URL=http://localhost:8080
VITE_WS_URL=ws://localhost:8080
```
## 🎮 How to Play

• Enter a username and join

• Wait for another player or bot

• Take turns dropping discs

• First to connect 4 discs wins

• Results update the leaderboard automatically

## 🏆 Leaderboard

• Stores total wins per player

• Persists across server restarts

• Backed by PostgreSQL

• Excludes bot wins

## 🚀 Deployment
### 1. Backend

• Deployed on Railway

• Uses Railway PostgreSQL

• Auto-deploys from GitHub

### 2. Frontend

• Deployed on Vercel

• Environment-based API & WS URLs

## 🔒 Security Notes

• .env files are not committed

• Database credentials stored securely

• Server enforces turn validation

## 📌 Future Improvements

• Draw detection

• Player avatars

• Ranked matchmaking

• Spectator mode

• Animations & sound effects

## 👤 Author

Anurag

Computer Science Student

Full-Stack Developer (Go + React)

