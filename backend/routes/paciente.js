const express = require('express');
const router = express.Router();

// Instanciamos a model do paciente
const Paciente = require('../models/paciente');

/**
 * Inserção de novos pacientes
*/
router.post('', (req, res, next) => {
    const paciente = new Paciente({
        nome: req.body.nome,
        cpf: req.body.cpf,
        leito: req.body.leito,
        data_internacao: req.body.data_internacao,
        data_alta: req.body.data_alta
    })

    // (Inserindo um paciente na base)
    paciente.save()
    .then(pacienteInserido => {
        res.status(201).json({
            mensagem: 'Paciente inserido',
            paciente: {
                id: pacienteInserido._id,
                nome: pacienteInserido.nome,
                cpf: pacienteInserido.cpf,
                leito: pacienteInserido.leito,
                data_internacao: pacienteInserido.data_internacao,
                data_alta: pacienteInserido.data_alta
            }
        });
    });
})

/**
 * Busca de todos os pacientes da base
 */
router.get('', (req, res) => {
    Paciente.find()
    .then((pacientesEncontrados) => {
        res.status(200).json({
            mensagem: 'Tudo OK',
            pacientes: pacientesEncontrados,
        })
    })
})

/**
 * Delete passando o ID do paciente
*/
router.delete('/:id', (req, res, next) => {
    Paciente.deleteOne({ _id: req.params.id }).then((resultado) => {
        res.status(200).end();
    })
})

/**
 * Método para atualizar o paciente - passando o ID
*/
router.put('/:id', (req, res, next) => {

    const paciente = new Paciente({
        _id: req.params.id,
        nome: req.params.nome,
        cpf: req.params.cpf,
        leito: req.params.leito,
        data_internacao: req.params.data_internacao,
        data_alta: req.params.data_alta
    })

    Paciente.updateOne({_id: req.params.id}, paciente)
    .then((resultado) => {
        res.status(200).json({
            mensagem: `Atualização do paciente de ID ${req.params.id} realizada com sucesso`
        })
    })

})

/**
 * Pega o Paciente pelo ID
*/
router.get('/:id', (req, res, next) => {
    Paciente.findById(req.params.id).then(paciente => {
        if(paciente)
        {
            res.status(200).json(paciente);
        } else
        {
            res.status(404).json({
                mensagem: "Paciente não encontrado!"
            })
        }
    })
})

module.exports = router;