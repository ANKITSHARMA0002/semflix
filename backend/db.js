const Database = require("better-sqlite3")
const db = new Database("semflix.db")

db.prepare(`
CREATE TABLE IF NOT EXISTS users(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 name TEXT,
 email TEXT UNIQUE,
 password TEXT,
 role TEXT DEFAULT 'student'
)
`).run()

module.exports = db
