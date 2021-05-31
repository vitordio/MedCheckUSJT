const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const usuarioSchema = mongoose.Schema({
  nomeUsuario: { type: String, required: true, unique: true },
  idadeUsuario: { type: Date, required: true },
  cpfUsuario: { type: String, required: true },
  funcional: { type: String, required: true },
  telefone: { type: String, required: true },
  password: { type: String, required: true }
});
usuarioSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Usuario", usuarioSchema);
