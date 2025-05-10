const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes/routes');

dotenv.config(); // Carrega variáveis do .env

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', routes);

const PORT = process.env.PORT || 3000;
const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI)
  .then(() => {
    console.log('Conectado ao MongoDB com sucesso');
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));
