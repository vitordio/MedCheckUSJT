const mongoose = require('mongoose');

// definindo o schema
const medicoSchema = mongoose.Schema({
    nome: { type: String, required: true },
    crm: { type: String, required: true },
    nome: { type: String, required: true },
    senha: { type: String, required: true }
})

//criamos o modelo associado ao nome Medico e exportamos
//tornando acessível para outros módulos da aplicação
module.exports = mongoose.model('Medico', medicoSchema);