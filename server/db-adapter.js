const sqlite3 = require('sqlite3').verbose();
const { createClient } = require('@libsql/client');
const path = require('path');
const fs = require('fs');

const isLibSql = !!process.env.TURSO_DATABASE_URL;

let dbLocal;
let dbRemote;

if (isLibSql) {
    dbRemote = createClient({
        url: process.env.TURSO_DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN,
    });
} else {
    // Local fallback
    const dataDir = process.env.DATA_DIR || path.resolve(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    const dbPath = path.resolve(dataDir, 'database.sqlite');
    dbLocal = new sqlite3.Database(dbPath);
}

module.exports = {
    // Wrapper for SELECT (returns array of rows)
    query: async (sql, params = []) => {
        if (isLibSql) {
            const rs = await dbRemote.execute({ sql, args: params });
            return rs.rows;
        } else {
            return new Promise((resolve, reject) => {
                dbLocal.all(sql, params, (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            });
        }
    },
    // Wrapper for INSERT/UPDATE/DELETE
    run: async (sql, params = []) => {
        if (isLibSql) {
            await dbRemote.execute({ sql, args: params });
            return {}; // LibSQL doesn't return 'this' context easily
        } else {
            return new Promise((resolve, reject) => {
                dbLocal.run(sql, params, function (err) {
                    if (err) reject(err);
                    else resolve(this);
                });
            });
        }
    },
    // Wrapper for SELECT ONE
    get: async (sql, params = []) => {
        if (isLibSql) {
            const rs = await dbRemote.execute({ sql, args: params });
            return rs.rows[0];
        } else {
            return new Promise((resolve, reject) => {
                dbLocal.get(sql, params, (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                });
            });
        }
    },
    isLibSql
};
