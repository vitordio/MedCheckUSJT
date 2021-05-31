const mongoose = require('mongoose');

// definindo o schema
const statusSchema = mongoose.Schema({
  idPaciente: {
    type: Schema.types.ObjectId,
    ref: 'Paciente'
  },
  temperatura: { type: String, required: true },
  pressao: { type: String, required: true },
  nivelEvolucao: { type: String, required: true },
  problemasRespiratorios: { type: Boolean, required: true },
  cansaco: { type: Boolean, required: true },
  alimentacao: { type: Boolean, required: true },
  observacao: { type: String, required: false }
})
//criamos o modelo associado ao nome Medico e exportamos
//tornando acessível para outros módulos da aplicação
module.exports = mongoose.model('Status', statusSchema);
