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

const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@${dbCluster}.vhzwx.mongodb.net/${dbName}?retryWrites=true&w=majority`)
.then(() => {
  console.log('Conexão OK');
}).catch(() => {
  console.log('Conexão NOK');
})

