const mongoose = require('mongoose');

// definindo o schema
const statusSchema = mongoose.Schema({
    idPaciente: {
        type: Schema.types.ObjectId,
        ref: 'Paciente'
    },
    temperatura: { type: String, required: true },
    pressaoArterial: { type: String, required: true },
    nivelGravidade: { type: String, required: true },
    problemasRespiratorios: { type: Boolean, required: true },
    possuiCansaco: { type: Boolean, required: true },
    alimentandoBem: { type: Boolean, required: true },
})
//criamos o modelo associado ao nome Medico e exportamos
//tornando acessível para outros módulos da aplicação
module.exports = mongoose.model('Status', statusSchema);
