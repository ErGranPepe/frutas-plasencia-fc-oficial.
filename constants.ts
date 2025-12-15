import { Player, MatchResult, Question, TrophyItem, NewsItem } from './types';

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Comunicado Oficial: Temporada 25/26',
    date: 'Hace 2 días',
    type: 'oficial',
    content: 'Arranca la nueva temporada. Objetivo: Ascenso directo y menos resacas.'
  }
];

export const TROPHIES: TrophyItem[] = [
  {
    id: '1',
    title: 'Copa de Ascenso',
    year: '2023',
    description: 'Campeones de 3ª División Liga Estoril. Subimos a lo grande.',
    type: 'gold'
  },
  {
    id: '2',
    title: 'Subcampeón de Copa',
    year: '2022',
    description: 'Perdimos la final pero ganamos el tercer tiempo.',
    type: 'silver'
  },
  {
    id: '3',
    title: 'Equipo Revelación',
    year: '2024',
    description: 'Premio al equipo con mejor juego ofensivo del torneo.',
    type: 'bronze'
  }
];

export const ROSTER: Player[] = [
  { 
    id: 'p1',
    number: 69, 
    name: 'SP', 
    position: 'POR', 
    nickname: 'El Muro', 
    photo: '',
    age: 21,
    job: 'Turismo y ADE',
    bio: 'Estudia Turismo para saber dónde celebrar las victorias y ADE para gestionar las multas del equipo. Con 20 años ya manda más que el entrenador.',
    tags: ['crazy', 'leader'],
    stats: { ritmo: 65, tiro: 40, pase: 70, regate: 55, defensa: 88, fisico: 85 }
  },
  { 
    id: 'p2',
    number: 1, 
    name: 'Pedro G', 
    position: 'POR', 
    photo: '',
    age: 18,
    job: 'Bachillerato',
    bio: 'El bebé del equipo. Tiene que terminar los deberes de Mates antes de venir a los partidos. Si el partido acaba tarde, su madre nos bronquea.',
    tags: ['calm', 'reflex'],
    stats: { ritmo: 70, tiro: 30, pase: 60, regate: 45, defensa: 85, fisico: 60 }
  },
  { 
    id: 'p3',
    number: 2, 
    name: 'Ramos', 
    position: 'DEF', 
    photo: '',
    age: 25,
    job: 'Futuro Guardia Civil',
    bio: 'La autoridad. Como le repliques una falta te pide el DNI y te mete al calabozo. Juega con la porra escondida en las espinilleras.',
    tags: ['strong', 'aggressive'],
    stats: { ritmo: 78, tiro: 55, pase: 65, regate: 50, defensa: 92, fisico: 95 }
  },
  { 
    id: 'p4',
    number: 3, 
    name: 'Fran', 
    position: 'DEF', 
    photo: '',
    age: 22,
    job: 'Militar',
    bio: 'Se casa pronto, así que juega cada partido como si fuera su despedida de soltero. Disciplina militar: si no corres, te hace hacer 50 flexiones.',
    tags: ['fast', 'tactical'],
    stats: { ritmo: 85, tiro: 60, pase: 70, regate: 65, defensa: 84, fisico: 90 }
  },
  { 
    id: 'p5',
    number: 4, 
    name: 'Malmierca', 
    position: 'DEF', 
    photo: '',
    age: 23,
    job: 'Mecánico de Aviones',
    bio: 'Soltero de oro. Estudia cosas de aviones, por eso siempre está en las nubes. Si buscas marido con futuro aeronáutico, este es tu hombre.',
    tags: ['vision', 'calm'],
    stats: { ritmo: 75, tiro: 50, pase: 75, regate: 60, defensa: 86, fisico: 78 }
  },
  { 
    id: 'p6',
    number: 5, 
    name: 'Gorgojo', 
    position: 'MED', 
    photo: '',
    age: 20,
    job: 'Magisterio',
    bio: 'Futuro profe. Se pasa el partido educando a los rivales y corrigiendo la gramática del árbitro cuando nos insulta. Tiene paciencia (a veces).',
    tags: ['creative', 'stamina'],
    stats: { ritmo: 72, tiro: 65, pase: 82, regate: 78, defensa: 60, fisico: 80 }
  },
  { 
    id: 'p7',
    number: 6, 
    name: 'Raúl', 
    position: 'MED', 
    photo: '',
    age: '20-y-algo',
    job: 'Estudiante Misterioso',
    bio: 'Está con Polo (no preguntes, es complicado o muy simple). Su vida es un misterio pero en el campo reparte juego como si fuera el jefe.',
    tags: ['leader', 'passer'],
    stats: { ritmo: 68, tiro: 70, pase: 88, regate: 75, defensa: 70, fisico: 75 }
  },
  { 
    id: 'p8',
    number: 7, 
    name: 'Óscar D', 
    position: 'MED', 
    photo: '',
    age: 20,
    job: 'Deportes',
    bio: 'Estudia deporte, tiene novia y peinado de futbolista. Básicamente vive la vida que todos queremos. Corre más que Forrest Gump.',
    tags: ['skill', 'flashy'],
    stats: { ritmo: 88, tiro: 75, pase: 78, regate: 85, defensa: 55, fisico: 82 }
  },
  { 
    id: 'p9',
    number: 8, 
    name: 'Yago', 
    position: 'MED', 
    photo: '',
    age: 23,
    job: 'Mago y Mecánico',
    bio: 'Te arregla el coche y te hace desaparecer la cartera. Tiene novia, así que su mejor truco de magia es escaparse para venir a jugar los domingos.',
    tags: ['hardworking', 'team'],
    stats: { ritmo: 74, tiro: 68, pase: 80, regate: 99, defensa: 65, fisico: 70 }
  },
  { 
    id: 'p10',
    number: 9, 
    name: 'Alubia', 
    position: 'DEL', 
    nickname: 'Chef Álvaro',
    photo: '',
    age: 21,
    job: 'Cocinero',
    bio: 'Se llama Álvaro pero es "Alubia". Es Chef, así que cocina los goles a fuego lento. Cuidado, que tiene buen manejo de los cuchillos (y de los codos).',
    tags: ['scorer', 'clutch'],
    stats: { ritmo: 82, tiro: 91, pase: 65, regate: 78, defensa: 30, fisico: 75 }
  },
  { 
    id: 'p11',
    number: 10, 
    name: 'Gonzalo', 
    position: 'DEL', 
    photo: '',
    age: 20,
    job: 'Karate Kid',
    bio: 'Cinturón negro. Si no te regatea, te hace una llave de judo. Juega tranquilo porque sabe que podría matar a todo el equipo rival con el meñique.',
    tags: ['star', 'technical'],
    stats: { ritmo: 85, tiro: 88, pase: 80, regate: 90, defensa: 60, fisico: 88 }
  },
  { 
    id: 'p12',
    number: 11, 
    name: 'Guille G', 
    position: 'DEL', 
    photo: '',
    age: 20,
    job: 'Farmacia',
    bio: 'Hermano de Pedro. Es "el majo" del equipo y estudia Farmacia, así que nos suministra el Ibuprofeno para las resacas post-partido.',
    tags: ['fast', 'dribbler'],
    stats: { ritmo: 90, tiro: 82, pase: 75, regate: 84, defensa: 40, fisico: 68 }
  },
  { 
    id: 'p13',
    number: 19, 
    name: 'Jose', 
    position: 'DEL', 
    photo: '',
    age: 22,
    job: 'Deportes / Tenis',
    bio: 'Juega al tenis y estudia deporte. Tiene novia formal. A veces intenta rematar de revés o sacar como Nadal. Mucha clase, poco barro.',
    tags: ['power', 'finisher'],
    stats: { ritmo: 79, tiro: 85, pase: 72, regate: 76, defensa: 45, fisico: 80 }
  },
  { 
    id: 'p14',
    number: 30, 
    name: 'Jorge G', 
    position: 'DEL', 
    photo: '',
    age: '?',
    job: 'Incógnito',
    bio: 'Amigo de Gonzalo. Nadie sabe nada de él. ¿Existe? ¿Es un agente de la CIA? ¿Es un holograma? Aparece, marca y desaparece en la niebla.',
    tags: ['youth', 'energy'],
    stats: { ritmo: 88, tiro: 80, pase: 60, regate: 82, defensa: 50, fisico: 70 }
  },
];

export const RECENT_MATCHES: MatchResult[] = [
  { id: 'm1', opponent: 'Rayo Municipianos', ourScore: 13, theirScore: 3, result: 'W' },
  { id: 'm2', opponent: 'Los de Siempre CF', ourScore: 3, theirScore: 1, result: 'W' },
  { id: 'm3', opponent: 'Espartanos FC', ourScore: 10, theirScore: 1, result: 'W' },
  { id: 'm4', opponent: 'Prosyston', ourScore: 5, theirScore: 4, result: 'W' },
  { id: 'm5', opponent: 'Rayo Nicaragua', ourScore: 3, theirScore: 5, result: 'L' },
];

export const NEXT_MATCH = {
  opponent: "Atlético Barril",
  date: "Próximo Sábado",
  time: "20:00",
  location: "Campo 2"
};

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Sábado noche antes del partido. ¿Cuál es tu plan?",
    options: [
      { text: "Agüita, cenar pasta y a la cama a las 22:00 (Mentira).", points: { POR: 3, DEF: 2 } },
      { text: "Cierro la discoteca pero llego al partido (aunque huela a alcohol).", points: { DEL: 5, MED: 2 } },
      { text: "Me quedo en casa viendo vídeos de mis propios goles.", points: { DEL: 3, MED: 3 } },
      { text: "Salgo 'de tranquis' y acabo desayunando churros.", points: { DEF: 4, MED: 4, POR: 4 } },
    ],
  },
  {
    id: 2,
    text: "El árbitro pita un fuera de juego inexistente. ¿Qué haces?",
    options: [
      { text: "Le insulto en 3 idiomas y me llevo amarilla.", points: { DEF: 5, POR: 4 } },
      { text: "Le explico el reglamento amablemente (soy un pesado).", points: { MED: 4, DEF: 2 } },
      { text: "No me entero porque me estaba peinando.", points: { DEL: 5, POR: 1 } },
      { text: "Le digo 'no pasa nada, profe', soy un pelota.", points: { MED: 3, DEL: 1 } },
    ],
  },
  {
    id: 3,
    text: "Fallas un gol a puerta vacía. Tu excusa es...",
    options: [
      { text: "El campo es una patata, la pelota botó mal.", points: { DEL: 5, MED: 2 } },
      { text: "Fue culpa del pase, que venía con nieve.", points: { DEL: 4, MED: 1 } },
      { text: "Me deslumbró el foco (era de día).", points: { POR: 3, DEF: 3 } },
      { text: "Hago como que me he lesionado para que no me digan nada.", points: { DEF: 2, MED: 4 } },
    ],
  },
  {
    id: 4,
    text: "¿Cuál es tu aportación principal al 'Tercer Tiempo' (las cañas)?",
    options: [
      { text: "Soy el que propone chupitos aunque perdamos 0-5.", points: { POR: 5, DEF: 4 } },
      { text: "Analizar tácticamente por qué perdimos (aburro a todos).", points: { MED: 5, DEF: 2 } },
      { text: "Subir stories a Instagram haciéndome el guapo.", points: { DEL: 5 } },
      { text: "Yo no bebo, mi cuerpo es un templo (nadie te cree).", points: { MED: 2, DEF: 3 } },
    ],
  },
  {
    id: 5,
    text: "Si tuvieras que definir tu estilo de juego con una palabra tonta:",
    options: [
      { text: "Leñador (Doy más patadas que pases).", points: { DEF: 5 } },
      { text: "Mago (Desaparezco en los partidos importantes).", points: { MED: 4, DEL: 2 } },
      { text: "Muro de hormigón (O eso creo yo).", points: { POR: 5 } },
      { text: "Pichichi de entrenamiento.", points: { DEL: 5, MED: 2 } },
    ],
  },
];
