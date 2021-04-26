const express = require('express');

const pacienteController = require('../controllers/paciente')

const router = express.Router();

router.get('/', pacienteController.getAllPacientes);

router.post('/', pacienteController.postPaciente);

router.put('/', pacienteController.putPaciente);

router.delete('/:idPaciente', pacienteController.deletePaciente);

module.exports = router;