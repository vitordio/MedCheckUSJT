const express = require('express');

const bodyParser = require('body-parser');

const pacienteRoutes = require('./routes/paciente');

const errorController = require('./controllers/error');

const app = express();

app.use(express.json());

const ports = process.env.PORT || 3000;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE'
    )
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    )
    next();
});

app.use('/pacientes', pacienteRoutes);

app.use(errorController.get404);

app.use(errorController.get500);

app.listen(ports, () => console.log(`Ouvindo na porta ${ports}`));