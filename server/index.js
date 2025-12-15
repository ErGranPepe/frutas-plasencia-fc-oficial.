const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increased limit for base64 images

// -- API ROUTES --

// PLAYERS
app.get('/api/players', (req, res) => {
    db.all("SELECT * FROM players", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        // Parse JSON fields
        const players = rows.map(p => ({
            ...p,
            tags: JSON.parse(p.tags),
            stats: JSON.parse(p.stats)
        }));
        res.json(players);
    });
});

app.post('/api/players', (req, res) => {
    const p = req.body;
    const stmt = db.prepare("INSERT INTO players VALUES (?,?,?,?,?,?,?,?,?,?,?)");
    stmt.run(p.id, p.number, p.name, p.position, p.nickname || '', p.photo, String(p.age), p.job, p.bio, JSON.stringify(p.tags), JSON.stringify(p.stats), function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Player created", id: p.id });
    });
});

app.put('/api/players/:id', (req, res) => {
    const p = req.body;
    const { id } = req.params;
    // We update everything for simplicity
    const sql = `UPDATE players SET number=?, name=?, position=?, nickname=?, photo=?, age=?, job=?, bio=?, tags=?, stats=? WHERE id=?`;
    db.run(sql, [p.number, p.name, p.position, p.nickname, p.photo, String(p.age), p.job, p.bio, JSON.stringify(p.tags), JSON.stringify(p.stats), id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Player updated" });
    });
});

app.delete('/api/players/:id', (req, res) => {
    db.run("DELETE FROM players WHERE id=?", req.params.id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Deleted" });
    });
});

// MATCHES
app.get('/api/matches', (req, res) => {
    db.all("SELECT * FROM matches ORDER BY date DESC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/matches', (req, res) => {
    const m = req.body;
    const stmt = db.prepare("INSERT INTO matches VALUES (?,?,?,?,?,?)");
    stmt.run(m.id, m.opponent, m.ourScore, m.theirScore, m.result, m.date || '', function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Match created" });
    });
});

app.put('/api/matches/:id', (req, res) => {
    const m = req.body;
    const sql = `UPDATE matches SET opponent=?, ourScore=?, theirScore=?, result=?, date=? WHERE id=?`;
    db.run(sql, [m.opponent, m.ourScore, m.theirScore, m.result, m.date, req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Match updated" });
    });
});

app.delete('/api/matches/:id', (req, res) => {
    db.run("DELETE FROM matches WHERE id=?", req.params.id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Deleted" });
    });
});

// NEWS
app.get('/api/news', (req, res) => {
    db.all("SELECT * FROM news ORDER BY date DESC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/news', (req, res) => {
    const n = req.body;
    const stmt = db.prepare("INSERT INTO news VALUES (?,?,?,?,?)");
    stmt.run(n.id, n.title, n.date, n.type, n.content, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "News created" });
    });
});

app.delete('/api/news/:id', (req, res) => {
    db.run("DELETE FROM news WHERE id=?", req.params.id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Deleted" });
    });
});

// SETTINGS (Next Match, Photo)
app.get('/api/settings/:key', (req, res) => {
    db.get("SELECT value FROM settings WHERE key=?", req.params.key, (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (row && req.params.key === 'nextMatch') {
            res.json(JSON.parse(row.value));
        } else if (row) {
            res.json({ value: row.value });
        } else {
            res.status(404).json({ message: "Not found" });
        }
    });
});

app.post('/api/settings/:key', (req, res) => {
    const { key } = req.params;
    let value = req.body.value;
    if (key === 'nextMatch') {
        value = JSON.stringify(req.body);
    }

    // Upsert equivalent
    db.run(`INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value`, [key, value], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Setting updated" });
    });
});


// Serve static files from React app in production
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
