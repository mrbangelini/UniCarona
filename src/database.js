const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const dataDir = path.join(__dirname, '..', 'data');
const dbPath = path.join(dataDir, 'unicarona.sqlite');

fs.mkdirSync(dataDir, { recursive: true });

const db = new sqlite3.Database(dbPath);

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function callback(error) {
      if (error) {
        reject(error);
        return;
      }

      resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (error, row) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(row);
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (error, rows) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(rows);
    });
  });
}

const sampleRides = [
  {
    motorista: 'Lucas Mendes',
    iniciais: 'LM',
    classeAvatar: 'avatar--laranja',
    avaliacao: 4.9,
    origem: 'Asa Norte, SQN 210',
    destino: 'Campus Universitário',
    horario: '18:15',
    periodo: 'noite',
    vagas: 2,
    valor: 8,
    veiculo: 'Honda Civic · Prata',
    dataExibicao: 'Hoje',
    observacao: 'Posso esperar até 10 minutos. Ar-condicionado e música baixa.',
    confirmacaoImediata: true,
    preferencias: ['confirmacao-imediata']
  },
  {
    motorista: 'Camila Souza',
    iniciais: 'CS',
    classeAvatar: 'avatar--roxo',
    avaliacao: 5,
    origem: 'Águas Claras',
    destino: 'Campus Universitário',
    horario: '17:40',
    periodo: 'tarde',
    vagas: 1,
    valor: 7,
    veiculo: 'Onix · Azul',
    dataExibicao: 'Hoje',
    observacao: 'Saída perto da estação Águas Claras. Aceito mochila e bagagem pequena.',
    confirmacaoImediata: true,
    preferencias: ['confirmacao-imediata', 'aceita-bagagem', 'apenas-mulheres']
  },
  {
    motorista: 'Rafael Barbosa',
    iniciais: 'RB',
    classeAvatar: 'avatar--verde',
    avaliacao: 4.8,
    origem: 'Sudoeste',
    destino: 'Campus Universitário',
    horario: '18:30',
    periodo: 'noite',
    vagas: 3,
    valor: 6,
    veiculo: 'Renault Kwid · Branco',
    dataExibicao: 'Hoje',
    observacao: 'Trajeto direto pela EPTG. Conversa moderada e sem cigarro.',
    confirmacaoImediata: false,
    preferencias: ['aceita-bagagem']
  },
  {
    motorista: 'Mariana Alves',
    iniciais: 'MA',
    classeAvatar: 'avatar--roxo',
    avaliacao: 4.9,
    origem: 'Taguatinga Centro',
    destino: 'Campus Universitário',
    horario: '07:10',
    periodo: 'manha',
    vagas: 2,
    valor: 9,
    veiculo: 'Hyundai HB20 · Cinza',
    dataExibicao: 'Amanhã',
    observacao: 'Posso passar perto da estação do metrô. Pontualidade é importante.',
    confirmacaoImediata: true,
    preferencias: ['confirmacao-imediata', 'apenas-mulheres']
  },
  {
    motorista: 'Pedro Henrique',
    iniciais: 'PH',
    classeAvatar: 'avatar--laranja',
    avaliacao: 4.7,
    origem: 'Guará II',
    destino: 'Campus Universitário',
    horario: '13:20',
    periodo: 'tarde',
    vagas: 1,
    valor: 7.5,
    veiculo: 'Fiat Argo · Preto',
    dataExibicao: 'Hoje',
    observacao: 'Saída próxima ao ParkShopping. Levo apenas bagagem pequena.',
    confirmacaoImediata: false,
    preferencias: ['aceita-bagagem']
  },
  {
    motorista: 'Beatriz Lima',
    iniciais: 'BL',
    classeAvatar: 'avatar--roxo',
    avaliacao: 5,
    origem: 'Plano Piloto, 408 Sul',
    destino: 'Campus Universitário',
    horario: '19:05',
    periodo: 'noite',
    vagas: 2,
    valor: 5,
    veiculo: 'Nissan Versa · Branco',
    dataExibicao: 'Hoje',
    observacao: 'Posso buscar em pontos próximos da W3 Sul.',
    confirmacaoImediata: true,
    preferencias: ['confirmacao-imediata', 'apenas-mulheres']
  },
  {
    motorista: 'Guilherme Rocha',
    iniciais: 'GR',
    classeAvatar: 'avatar--verde',
    avaliacao: 4.8,
    origem: 'Lago Norte',
    destino: 'Campus Universitário',
    horario: '08:00',
    periodo: 'manha',
    vagas: 3,
    valor: 10,
    veiculo: 'Jeep Renegade · Grafite',
    dataExibicao: 'Amanhã',
    observacao: 'Espaço no porta-malas e rota pela L4.',
    confirmacaoImediata: true,
    preferencias: ['confirmacao-imediata', 'aceita-bagagem']
  },
  {
    motorista: 'Ana Clara',
    iniciais: 'AC',
    classeAvatar: 'avatar--laranja',
    avaliacao: 4.9,
    origem: 'Samambaia Sul',
    destino: 'Campus Universitário',
    horario: '06:45',
    periodo: 'manha',
    vagas: 1,
    valor: 11,
    veiculo: 'Volkswagen Polo · Azul',
    dataExibicao: 'Amanhã',
    observacao: 'Passo próximo à estação Furnas.',
    confirmacaoImediata: false,
    preferencias: ['apenas-mulheres']
  }
];

function mapUser(row) {
  if (!row) return null;

  return {
    id: row.id,
    email: row.email,
    name: row.name,
    initials: row.initials,
    role: row.role
  };
}

function mapRide(row) {
  return {
    id: `db-${row.id}`,
    motorista: row.driver,
    iniciais: row.initials,
    classeAvatar: row.avatar_class,
    avaliacao: Number(row.rating),
    origem: row.origin,
    destino: row.destination,
    horario: row.ride_time,
    periodo: row.period,
    vagas: Number(row.seats),
    valor: Number(row.price),
    veiculo: row.vehicle,
    dataExibicao: row.display_date,
    observacao: row.note,
    confirmacaoImediata: Boolean(row.instant_confirmation),
    preferencias: JSON.parse(row.preferences_json || '[]')
  };
}

async function initDatabase() {
  await run('PRAGMA foreign_keys = ON');

  await run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      initials TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'student',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS rides (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      driver TEXT NOT NULL,
      initials TEXT NOT NULL,
      avatar_class TEXT NOT NULL,
      rating REAL NOT NULL DEFAULT 4.9,
      origin TEXT NOT NULL,
      destination TEXT NOT NULL,
      ride_time TEXT NOT NULL,
      period TEXT NOT NULL,
      seats INTEGER NOT NULL,
      price REAL NOT NULL DEFAULT 0,
      vehicle TEXT NOT NULL,
      display_date TEXT NOT NULL DEFAULT 'Hoje',
      note TEXT NOT NULL,
      instant_confirmation INTEGER NOT NULL DEFAULT 0,
      preferences_json TEXT NOT NULL DEFAULT '[]',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      expires_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  await seedDatabase();
}

async function seedDatabase() {
  const totalUsers = await get('SELECT COUNT(*) AS total FROM users');

  if (totalUsers.total === 0) {
    const hash = await bcrypt.hash('123456', 10);
    const users = [
      ['marcelo.rbangelini@sempreceub.com', 'Marcelo Rabelo Bueno Angelini', 'MA', hash, 'student'],
      ['davi.vidal@sempreceub.com', 'Davi Vidal de Negreiros Nóbrega Leite Andrade', 'DV', hash, 'student']
    ];

    for (const user of users) {
      await run(
        'INSERT INTO users (email, name, initials, password_hash, role) VALUES (?, ?, ?, ?, ?)',
        user
      );
    }
  }

  const totalRides = await get('SELECT COUNT(*) AS total FROM rides');

  if (totalRides.total === 0) {
    const user = await get('SELECT id FROM users WHERE email = ?', ['marcelo.rbangelini@sempreceub.com']);

    for (const ride of sampleRides) {
      await run(
        `INSERT INTO rides (
          user_id, driver, initials, avatar_class, rating, origin, destination,
          ride_time, period, seats, price, vehicle, display_date, note,
          instant_confirmation, preferences_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          user.id,
          ride.motorista,
          ride.iniciais,
          ride.classeAvatar,
          ride.avaliacao,
          ride.origem,
          ride.destino,
          ride.horario,
          ride.periodo,
          ride.vagas,
          ride.valor,
          ride.veiculo,
          ride.dataExibicao,
          ride.observacao,
          ride.confirmacaoImediata ? 1 : 0,
          JSON.stringify(ride.preferencias)
        ]
      );
    }
  }
}

async function authenticateUser(email, senha) {
  const user = await get('SELECT * FROM users WHERE email = ?', [email.toLowerCase()]);

  if (!user) return null;

  const validPassword = await bcrypt.compare(senha, user.password_hash);

  if (!validPassword) return null;

  return mapUser(user);
}

async function createSession(userId, token) {
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString();

  await run('INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)', [
    token,
    userId,
    expiresAt
  ]);
}

async function getUserByToken(token) {
  if (!token) return null;

  const row = await get(
    `SELECT users.*
       FROM sessions
       JOIN users ON users.id = sessions.user_id
      WHERE sessions.token = ? AND sessions.expires_at > ?`,
    [token, new Date().toISOString()]
  );

  return mapUser(row);
}

async function deleteSession(token) {
  if (!token) return;
  await run('DELETE FROM sessions WHERE token = ?', [token]);
}

async function listRides() {
  const rows = await all('SELECT * FROM rides ORDER BY created_at DESC, id DESC');
  return rows.map(mapRide);
}

async function createRide(user, payload) {
  const origin = String(payload.origem || payload.origin || '').trim();
  const destination = String(payload.destino || payload.destination || '').trim();
  const rideTime = String(payload.horario || payload.ride_time || '').trim();

  if (!origin || !destination || !rideTime) {
    const error = new Error('Origem, destino e horário são obrigatórios.');
    error.status = 400;
    throw error;
  }

  const seats = Math.max(1, Number(payload.vagas || payload.seats || 1));
  const price = Math.max(0, Number(payload.valor || payload.price || 0));
  const instant = Boolean(payload.confirmacaoImediata || payload.instant_confirmation);
  const preferences = Array.isArray(payload.preferencias)
    ? payload.preferencias
    : instant
      ? ['confirmacao-imediata']
      : [];

  const result = await run(
    `INSERT INTO rides (
      user_id, driver, initials, avatar_class, rating, origin, destination,
      ride_time, period, seats, price, vehicle, display_date, note,
      instant_confirmation, preferences_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      user.id,
      user.name,
      user.initials,
      'avatar--azul',
      4.9,
      origin,
      destination,
      rideTime,
      payload.periodo || payload.period || 'noite',
      seats,
      price,
      payload.veiculo || payload.vehicle || 'Seu veículo · A definir',
      payload.dataExibicao || payload.display_date || 'Hoje',
      payload.observacao || payload.note || 'Sem observações adicionais.',
      instant ? 1 : 0,
      JSON.stringify(preferences)
    ]
  );

  const ride = await get('SELECT * FROM rides WHERE id = ?', [result.id]);
  return mapRide(ride);
}

module.exports = {
  dbPath,
  initDatabase,
  authenticateUser,
  createSession,
  getUserByToken,
  deleteSession,
  listRides,
  createRide
};
