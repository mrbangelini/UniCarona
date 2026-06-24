const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '..', 'data', 'unicarona.sqlite');

if (fs.existsSync(dbPath)) {
  fs.rmSync(dbPath);
}

const { initDatabase } = require('./database');

initDatabase()
  .then(() => {
    console.log(`Banco recriado em ${dbPath}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error('Não foi possível recriar o banco:', error);
    process.exit(1);
  });
