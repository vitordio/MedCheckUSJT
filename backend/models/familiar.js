const mongoose = require('mongoose');

const familiarSchema = mongoose.Schema({
    idPaciente: {
        type: Schema.types.ObjectId,
        ref: 'Paciente'
    },
    nome: { type: String, required: true },
    cpf: { type: String, required: true },
    senha: { type: String, required: true}
})

module.exports = mongoose.model('Familiar', familiarSchema)