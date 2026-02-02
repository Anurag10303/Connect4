package store

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/lib/pq"
)

var DB *sql.DB

func InitDB() {
	connStr := os.Getenv("DATABASE_URL")

	if connStr == "" {
		log.Fatal("DATABASE_URL not set")
	}

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}

	if err := db.Ping(); err != nil {
		log.Fatal(err)
	}
	runMigrations(db)
	DB = db
	log.Println("PostgreSQL connected")
}

func runMigrations(db *sql.DB) {
	query := `
	CREATE TABLE IF NOT EXISTS leaderboard (
		id SERIAL PRIMARY KEY,
		username TEXT NOT NULL,
		wins INT DEFAULT 0
	);
	`
	if _, err := db.Exec(query); err != nil {
		log.Fatal("migration failed:", err)
	}

	log.Println("DB migrations applied")
}
