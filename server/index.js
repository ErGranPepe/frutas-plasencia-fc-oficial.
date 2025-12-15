const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db'); // This is now our adapter exported from db.js

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// -- API ROUTES --

// PLAYERS
app.get('/api/players', async (req, res) => {
    try {
        const rows = await db.query("SELECT * FROM players");
        const players = rows.map(p => ({
            ...p,
            tags: JSON.parse(p.tags),
            stats: JSON.parse(p.stats)
        }));
        res.json(players);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/players', async (req, res) => {
    const p = req.body;
    try {
        await db.run(
            "INSERT INTO players VALUES (?,?,?,?,?,?,?,?,?,?,?)",
            [p.id, p.number, p.name, p.position, p.nickname || '', p.photo, String(p.age), p.job, p.bio, JSON.stringify(p.tags), JSON.stringify(p.stats)]
        );
        res.json({ message: "Player created", id: p.id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/players/:id', async (req, res) => {
    const p = req.body;
    const { id } = req.params;
    const sql = `UPDATE players SET number=?, name=?, position=?, nickname=?, photo=?, age=?, job=?, bio=?, tags=?, stats=? WHERE id=?`;
    try {
        await db.run(sql, [p.number, p.name, p.position, p.nickname, p.photo, String(p.age), p.job, p.bio, JSON.stringify(p.tags), JSON.stringify(p.stats), id]);
        res.json({ message: "Player updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/players/:id', async (req, res) => {
    try {
        await db.run("DELETE FROM players WHERE id=?", [req.params.id]);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// MATCHES
app.get('/api/matches', async (req, res) => {
    try {
        const rows = await db.query("SELECT * FROM matches ORDER BY date DESC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/matches', async (req, res) => {
    const m = req.body;
    try {
        await db.run("INSERT INTO matches VALUES (?,?,?,?,?,?)", [m.id, m.opponent, m.ourScore, m.theirScore, m.result, m.date || '']);
        res.json({ message: "Match created" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/matches/:id', async (req, res) => {
    const m = req.body;
    const sql = `UPDATE matches SET opponent=?, ourScore=?, theirScore=?, result=?, date=? WHERE id=?`;
    try {
        await db.run(sql, [m.opponent, m.ourScore, m.theirScore, m.result, m.date, req.params.id]);
        res.json({ message: "Match updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/matches/:id', async (req, res) => {
    try {
        await db.run("DELETE FROM matches WHERE id=?", [req.params.id]);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// NEWS
app.get('/api/news', async (req, res) => {
    try {
        const rows = await db.query("SELECT * FROM news ORDER BY date DESC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/news', async (req, res) => {
    const n = req.body;
    try {
        await db.run("INSERT INTO news VALUES (?,?,?,?,?)", [n.id, n.title, n.date, n.type, n.content]);
        res.json({ message: "News created" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/news/:id', async (req, res) => {
    try {
        await db.run("DELETE FROM news WHERE id=?", [req.params.id]);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// SETTINGS
app.get('/api/settings/:key', async (req, res) => {
    try {
        const row = await db.get("SELECT value FROM settings WHERE key=?", [req.params.key]);
        // Adapt row access for flexibility
        if (row && req.params.key === 'nextMatch') {
            res.json(JSON.parse(row.value));
        } else if (row) {
            res.json({ value: row.value });
        } else {
            res.status(404).json({ message: "Not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/settings/:key', async (req, res) => {
    const { key } = req.params;
    let value = req.body.value;
    if (key === 'nextMatch') {
        value = JSON.stringify(req.body);
    }

    try {
        // Upsert works in SQLite and LibSQL
        await db.run(`INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value`, [key, value]);
        res.json({ message: "Setting updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Serve static files
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
