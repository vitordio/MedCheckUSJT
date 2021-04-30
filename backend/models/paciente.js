const mongoose = require('mongoose');

const pacienteSchema = mongoose.Schema({
    nome: { type: String, required: true },
    cpf: { type: String, required: true },
    leito: { type: String, required: true },
    data_internacao: { type: Date, required: true },
    data_alta: { type: Date, required: false }
})

module.exports = mongoose.model('Paciente', pacienteSchema);