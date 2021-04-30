require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

// Acessando as variáveis de ambiente
const dbUser = process.env.MONGODB_USER;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbCluster = process.env.MONGODB_CLUSTER;
const dbName = process.env.MONGODB_DATABASE;

// Instanciando os Objetos
const Medico   = require('./models/medico');
const Paciente = require('./models/paciente');
const Familiar = require('./models/familiar');
const Status   = require('./models/status')

// Importando as rotas definidas para o paciente
const pacienteRoutes = require('./routes/paciente');

const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@${dbCluster}.vhzwx.mongodb.net/${dbName}?retryWrites=true&w=majority`)
.then(() => {
  console.log('Conexão OK');
}).catch(() => {
  console.log('Conexão NOK');
})

app.use ((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE,OPTIONS');
  next();
});

app.use('/pacientes/', pacienteRoutes);