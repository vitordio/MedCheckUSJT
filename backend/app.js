const express = require('express');
const app = express();
const mongoose = require('mongoose');
const pacienteRoutes = require('./routes/pacientes');
const usuarioRoutes = require ('./routes/usuarios');


app.use(express.json());

mongoose.connect('mongodb+srv://dbteste2:senha@cluster0.f86ri.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(() => {
  console.log("Conexão realizada com sucesso.")
}).catch(() => {
  console.log("Conexao não realizada.")
})

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE,OPTIONS');
  next();
});

app.use('/api/pacientes', pacienteRoutes);
app.use('/api/usuarios', usuarioRoutes);


module.exports = app;
