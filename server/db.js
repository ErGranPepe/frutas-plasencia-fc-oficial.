const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const fs = require('fs');

// Use DATA_DIR env var if set (host usage), otherwise default to local 'data' folder
const dataDir = process.env.DATA_DIR || path.resolve(__dirname, 'data');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
const dbPath = path.resolve(dataDir, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    initDb();
  }
});

const INITIAL_ROSTER = [
  {
    id: 'p1', number: 69, name: 'SP', position: 'POR', nickname: 'El Muro', photo: '', age: '21', job: 'Turismo y ADE',
    bio: 'Estudia Turismo para saber dónde celebrar las victorias y ADE para gestionar las multas del equipo. Con 20 años ya manda más que el entrenador.',
    tags: JSON.stringify(['crazy', 'leader']),
    stats: JSON.stringify({ ritmo: 65, tiro: 40, pase: 70, regate: 55, defensa: 88, fisico: 85 })
  },
  {
    id: 'p2', number: 1, name: 'Pedro G', position: 'POR', photo: '', age: '18', job: 'Bachillerato',
    bio: 'El bebé del equipo. Tiene que terminar los deberes de Mates antes de venir a los partidos. Si el partido acaba tarde, su madre nos bronquea.',
    tags: JSON.stringify(['calm', 'reflex']),
    stats: JSON.stringify({ ritmo: 70, tiro: 30, pase: 60, regate: 45, defensa: 85, fisico: 60 })
  },
  {
    id: 'p3', number: 2, name: 'Ramos', position: 'DEF', photo: '', age: '25', job: 'Futuro Guardia Civil',
    bio: 'La autoridad. Como le repliques una falta te pide el DNI y te mete al calabozo. Juega con la porra escondida en las espinilleras.',
    tags: JSON.stringify(['strong', 'aggressive']),
    stats: JSON.stringify({ ritmo: 78, tiro: 55, pase: 65, regate: 50, defensa: 92, fisico: 95 })
  },
  {
    id: 'p4', number: 3, name: 'Fran', position: 'DEF', photo: '', age: '22', job: 'Militar',
    bio: 'Se casa pronto, así que juega cada partido como si fuera su despedida de soltero. Disciplina militar: si no corres, te hace hacer 50 flexiones.',
    tags: JSON.stringify(['fast', 'tactical']),
    stats: JSON.stringify({ ritmo: 85, tiro: 60, pase: 70, regate: 65, defensa: 84, fisico: 90 })
  },
  {
    id: 'p5', number: 4, name: 'Malmierca', position: 'DEF', photo: '', age: '23', job: 'Mecánico de Aviones',
    bio: 'Soltero de oro. Estudia cosas de aviones, por eso siempre está en las nubes. Si buscas marido con futuro aeronáutico, este es tu hombre.',
    tags: JSON.stringify(['vision', 'calm']),
    stats: JSON.stringify({ ritmo: 75, tiro: 50, pase: 75, regate: 60, defensa: 86, fisico: 78 })
  },
  {
    id: 'p6', number: 5, name: 'Gorgojo', position: 'MED', photo: '', age: '20', job: 'Magisterio',
    bio: 'Futuro profe. Se pasa el partido educando a los rivales y corrigiendo la gramática del árbitro cuando nos insulta. Tiene paciencia (a veces).',
    tags: JSON.stringify(['creative', 'stamina']),
    stats: JSON.stringify({ ritmo: 72, tiro: 65, pase: 82, regate: 78, defensa: 60, fisico: 80 })
  },
  {
    id: 'p7', number: 6, name: 'Raúl', position: 'MED', photo: '', age: '20-y-algo', job: 'Estudiante Misterioso',
    bio: 'Está con Polo (no preguntes, es complicado o muy simple). Su vida es un misterio pero en el campo reparte juego como si fuera el jefe.',
    tags: JSON.stringify(['leader', 'passer']),
    stats: JSON.stringify({ ritmo: 68, tiro: 70, pase: 88, regate: 75, defensa: 70, fisico: 75 })
  },
  {
    id: 'p8', number: 7, name: 'Óscar D', position: 'MED', photo: '', age: '20', job: 'Deportes',
    bio: 'Estudia deporte, tiene novia y peinado de futbolista. Básicamente vive la vida que todos queremos. Corre más que Forrest Gump.',
    tags: JSON.stringify(['skill', 'flashy']),
    stats: JSON.stringify({ ritmo: 88, tiro: 75, pase: 78, regate: 85, defensa: 55, fisico: 82 })
  },
  {
    id: 'p9', number: 8, name: 'Yago', position: 'MED', photo: '', age: '23', job: 'Mago y Mecánico',
    bio: 'Te arregla el coche y te hace desaparecer la cartera. Tiene novia, así que su mejor truco de magia es escaparse para venir a jugar los domingos.',
    tags: JSON.stringify(['hardworking', 'team']),
    stats: JSON.stringify({ ritmo: 74, tiro: 68, pase: 80, regate: 99, defensa: 65, fisico: 70 })
  },
  {
    id: 'p10', number: 9, name: 'Alubia', position: 'DEL', nickname: 'Chef Álvaro', photo: '', age: '21', job: 'Cocinero',
    bio: 'Se llama Álvaro pero es "Alubia". Es Chef, así que cocina los goles a fuego lento. Cuidado, que tiene buen manejo de los cuchillos (y de los codos).',
    tags: JSON.stringify(['scorer', 'clutch']),
    stats: JSON.stringify({ ritmo: 82, tiro: 91, pase: 65, regate: 78, defensa: 30, fisico: 75 })
  },
  {
    id: 'p11', number: 10, name: 'Gonzalo', position: 'DEL', photo: '', age: '20', job: 'Karate Kid',
    bio: 'Cinturón negro. Si no te regatea, te hace una llave de judo. Juega tranquilo porque sabe que podría matar a todo el equipo rival con el meñique.',
    tags: JSON.stringify(['star', 'technical']),
    stats: JSON.stringify({ ritmo: 85, tiro: 88, pase: 80, regate: 90, defensa: 60, fisico: 88 })
  },
  {
    id: 'p12', number: 11, name: 'Guille G', position: 'DEL', photo: '', age: '20', job: 'Farmacia',
    bio: 'Hermano de Pedro. Es "el majo" del equipo y estudia Farmacia, así que nos suministra el Ibuprofeno para las resacas post-partido.',
    tags: JSON.stringify(['fast', 'dribbler']),
    stats: JSON.stringify({ ritmo: 90, tiro: 82, pase: 75, regate: 84, defensa: 40, fisico: 68 })
  },
  {
    id: 'p13', number: 19, name: 'Jose', position: 'DEL', photo: '', age: '22', job: 'Deportes / Tenis',
    bio: 'Juega al tenis y estudia deporte. Tiene novia formal. A veces intenta rematar de revés o sacar como Nadal. Mucha clase, poco barro.',
    tags: JSON.stringify(['power', 'finisher']),
    stats: JSON.stringify({ ritmo: 79, tiro: 85, pase: 72, regate: 76, defensa: 45, fisico: 80 })
  },
  {
    id: 'p14', number: 30, name: 'Jorge G', position: 'DEL', photo: '', age: '?', job: 'Incógnito',
    bio: 'Amigo de Gonzalo. Nadie sabe nada de él. ¿Existe? ¿Es un agente de la CIA? ¿Es un holograma? Aparece, marca y desaparece en la niebla.',
    tags: JSON.stringify(['youth', 'energy']),
    stats: JSON.stringify({ ritmo: 88, tiro: 80, pase: 60, regate: 82, defensa: 50, fisico: 70 })
  },
];

const RECENT_MATCHES = [
  { id: 'm1', opponent: 'Rayo Municipianos', ourScore: 13, theirScore: 3, result: 'W' },
  { id: 'm2', opponent: 'Los de Siempre CF', ourScore: 3, theirScore: 1, result: 'W' },
  { id: 'm3', opponent: 'Espartanos FC', ourScore: 10, theirScore: 1, result: 'W' },
  { id: 'm4', opponent: 'Prosyston', ourScore: 5, theirScore: 4, result: 'W' },
  { id: 'm5', opponent: 'Rayo Nicaragua', ourScore: 3, theirScore: 5, result: 'L' },
];

const INITIAL_NEWS = [
  {
    id: '1',
    title: 'Comunicado Oficial: Temporada 25/26',
    date: 'Hace 2 días',
    type: 'oficial',
    content: 'Arranca la nueva temporada. Objetivo: Ascenso directo y menos resacas.'
  }
];

const NEXT_MATCH = {
  opponent: "Atlético Barril",
  date: "Próximo Sábado",
  time: "20:00",
  location: "Campo 2"
};

function initDb() {
  db.serialize(() => {
    // 1. Players Table
    db.run(`CREATE TABLE IF NOT EXISTS players (
      id TEXT PRIMARY KEY,
      number INTEGER,
      name TEXT,
      position TEXT,
      nickname TEXT,
      photo TEXT,
      age TEXT,
      job TEXT,
      bio TEXT,
      tags TEXT,
      stats TEXT
    )`);

    // 2. Matches Table
    db.run(`CREATE TABLE IF NOT EXISTS matches (
      id TEXT PRIMARY KEY,
      opponent TEXT,
      ourScore INTEGER,
      theirScore INTEGER,
      result TEXT,
      date TEXT
    )`);

    // 3. News Table
    db.run(`CREATE TABLE IF NOT EXISTS news (
      id TEXT PRIMARY KEY,
      title TEXT,
      date TEXT,
      type TEXT,
      content TEXT
    )`);

    // 4. Settings Table (Key-Value)
    db.run(`CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    )`);

    // Check if seeded
    db.get("SELECT count(*) as count FROM players", (err, row) => {
      if (row.count === 0) {
        console.log("Seeding Players...");
        const stmt = db.prepare("INSERT INTO players VALUES (?,?,?,?,?,?,?,?,?,?,?)");
        INITIAL_ROSTER.forEach(p => {
          stmt.run(p.id, p.number, p.name, p.position, p.nickname || '', p.photo, String(p.age), p.job, p.bio, p.tags, p.stats);
        });
        stmt.finalize();
      }
    });

    db.get("SELECT count(*) as count FROM matches", (err, row) => {
      if (row.count === 0) {
        console.log("Seeding Matches...");
        const stmt = db.prepare("INSERT INTO matches VALUES (?,?,?,?,?,?)");
        RECENT_MATCHES.forEach(m => {
          stmt.run(m.id, m.opponent, m.ourScore, m.theirScore, m.result, m.date || '');
        });
        stmt.finalize();
      }
    });

    db.get("SELECT count(*) as count FROM news", (err, row) => {
      if (row.count === 0) {
        console.log("Seeding News...");
        const stmt = db.prepare("INSERT INTO news VALUES (?,?,?,?,?)");
        INITIAL_NEWS.forEach(n => {
          stmt.run(n.id, n.title, n.date, n.type, n.content);
        });
        stmt.finalize();
      }
    });

    db.get("SELECT count(*) as count FROM settings", (err, row) => {
      if (row.count === 0) {
        console.log("Seeding Settings...");
        const stmt = db.prepare("INSERT INTO settings VALUES (?,?)");
        stmt.run("nextMatch", JSON.stringify(NEXT_MATCH));
        stmt.run("teamPhoto", "https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=1200&auto=format&fit=crop&q=60");
        stmt.finalize();
      }
    });
  });
}

module.exports = db;
