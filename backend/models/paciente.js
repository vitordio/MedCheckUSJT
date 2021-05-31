const mongoose = require('mongoose');
//definindo o "schema"

const pacienteSchema = mongoose.Schema({
  nomePaciente: { type: String, required: true },
  cpfPaciente: { type: String, required: true },
  idadePaciente: {type:Date, required:true},
  leito: { type: String, required: true },
  data_internacao: { type: Date, required: true },
  data_alta: { type: Date, required: false },
  senha: { type: String, required: true }
});
//criamos o modelo associado ao nome paciente e exportamos
//tornando acessível para outros módulos da aplicação
module.exports = mongoose.model('Paciente', pacienteSchema);

