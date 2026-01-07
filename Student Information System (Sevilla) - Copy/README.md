# CCS Student Information System

This is a lightweight Student Information System for CCS. It uses an Express.js server and MySQL for persistent storage. The frontend is a set of static HTML pages with simple client-side JS for interactions.

## Features
- Students CRUD (via MySQL)
- Departments, Sections, Subjects listing
- Search across students (server API + localStorage fallback)
- Theme toggle and basic account settings (local-only)

## Prerequisites
- Node.js (v14+)
- MySQL server

## Quick setup

1. Clone or copy this project directory.

2. Create a `.env` file from the example and set your DB credentials:

```text
cp .env.example .env
# edit .env and set DB_PASS and any secrets
```

3. Create the database and tables using the provided schema:

```bash
# using the mysql client
mysql -u root -p < schema.sql
```

4. Install Node dependencies:

```bash
npm install
```

5. Start the server:

```bash
npm start
```

6. Open your browser to: `http://localhost:3000` (or the port you set in `.env`) use visual studio code extension live server.

## Notes on authentication
This project uses a very simple session-based login (see `server.js`). Credentials are read from environment variables `ADMIN_ID` and `ADMIN_PASSWORD`. This is suitable for demo use only — replace with a proper auth system for production.

## Database schema
The `schema.sql` file contains CREATE TABLE statements for `departments`, `sections`, `subjects`, and `students`. It also includes a few sample INSERT statements.

## API endpoints
- `GET /api/students` — list students (requires login)
- `GET /api/departments` — list departments (requires login)
- `GET /api/sections` — list sections (requires login)
- `GET /api/subjects` — list subjects (requires login)
- `GET /api/search?q=...` — search students by name or id (requires login)

## Local development tips
- If you prefer autoreload, install `nodemon` globally or run `npm run dev`.
- The frontend uses localStorage for offline/demo persistence; if no DB is reachable the client falls back to localStorage for searches.

## Troubleshooting
- `ECONNREFUSED` on startup: ensure MySQL is running and `.env` credentials are correct.
- `Access denied` when running `schema.sql`: use an account with privileges or ask your DBA.

## License
This is an example/demo project. Use at your own risk.
