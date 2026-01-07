const path = require('path');
const express = require('express');
const session = require('express-session');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'change_this_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'sis_db',
  waitForConnections: true,
  connectionLimit: 10,
});

function requireAuth(req, res, next) {
  if (req.session && req.session.authenticated) return next();
  return res.redirect('/login');
}

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', (req, res) => {
  const { id, password } = req.body;
  const ADMIN_ID = process.env.ADMIN_ID || 'admin';
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';

  // If ADMIN_ID is set, require both id and password match. Otherwise, require only password.
  if (ADMIN_ID) {
    if (id === ADMIN_ID && password === ADMIN_PASSWORD) {
      req.session.authenticated = true;
      return res.redirect('/homepage.html');
    }
  } else {
    if (password === ADMIN_PASSWORD) {
      req.session.authenticated = true;
      return res.redirect('/homepage.html');
    }
  }

  return res.redirect('/login');
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

app.get('/', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/homepage.html', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'homepage.html'));
});

app.get('/students.html', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'students.html'));
});
app.get('/departments.html', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'departments.html'));
});
app.get('/sections.html', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'sections.html'));
});
app.get('/subjects.html', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'subjects.html'));
});

// Serve static assets (css, js, assets folder) but protect API and HTML views are protected above
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/style.css', express.static(path.join(__dirname, 'style.css')));
app.use('/script.js', express.static(path.join(__dirname, 'script.js')));

// API routes
app.get('/api/students', requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM students');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/departments', requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM departments');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/sections', requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM sections');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/subjects', requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM subjects');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/search', requireAuth, async (req, res) => {
  const q = (req.query.q || '').trim();
  if (!q) return res.json([]);
  try {
    const [rows] = await pool.query(`
      SELECT student_id, last_name, first_name, department, section
      FROM students
      WHERE student_id LIKE ? OR last_name LIKE ? OR first_name LIKE ? OR department LIKE ?
      ORDER BY last_name, first_name
      LIMIT 50
    `, [`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`]);
    // Format the results to match the expected structure
    const formatted = rows.map(row => ({
      student_id: row.student_id,
      name: `${row.last_name} ${row.first_name}`.trim(),
      department: row.department,
      section: row.section
    }));
    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
