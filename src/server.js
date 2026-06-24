const path = require('path');
const crypto = require('crypto');
const express = require('express');
const {
  initDatabase,
  authenticateUser,
  createSession,
  getUserByToken,
  deleteSession,
  listRides,
  createRide,
  dbPath
} = require('./database');

const app = express();
const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, '..', 'public');

app.use(express.json());
app.use(express.static(publicDir));

function getBearerToken(req) {
  const header = req.headers.authorization || '';
  return header.startsWith('Bearer ') ? header.slice(7) : null;
}

async function requireAuth(req, res, next) {
  try {
    const token = getBearerToken(req);
    const user = await getUserByToken(token);

    if (!user) {
      res.status(401).json({ erro: 'Faça login para continuar.' });
      return;
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    next(error);
  }
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', banco: dbPath });
});

app.post('/api/auth/login', async (req, res, next) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const senha = String(req.body.senha || req.body.password || '');

    if (!email || !senha) {
      res.status(400).json({ erro: 'Informe e-mail e senha.' });
      return;
    }

    const user = await authenticateUser(email, senha);

    if (!user) {
      res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
      return;
    }

    const token = crypto.randomUUID();
    await createSession(user.id, token);

    res.json({ token, user });
  } catch (error) {
    next(error);
  }
});

app.get('/api/auth/me', requireAuth, (req, res) => {
  res.json({ user: req.user });
});

app.post('/api/auth/logout', requireAuth, async (req, res, next) => {
  try {
    await deleteSession(req.token);
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
});

app.get('/api/rides', async (req, res, next) => {
  try {
    const rides = await listRides();
    res.json({ rides });
  } catch (error) {
    next(error);
  }
});

app.post('/api/rides', requireAuth, async (req, res, next) => {
  try {
    const ride = await createRide(req.user, req.body);
    res.status(201).json({ ride });
  } catch (error) {
    next(error);
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = status === 500 ? 'Erro interno do servidor.' : error.message;

  if (status === 500) {
    console.error(error);
  }

  res.status(status).json({ erro: message });
});

initDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`UniCarona rodando em http://localhost:${port}`);
      console.log(`Banco local: ${dbPath}`);
    });
  })
  .catch((error) => {
    console.error('Falha ao iniciar o UniCarona:', error);
    process.exit(1);
  });
