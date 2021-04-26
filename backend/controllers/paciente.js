const Paciente = require('../models/paciente');

exports.getAllPacientes = async (req, res, next) => {
    try {
        const [allPacientes] = await Paciente.fetchAll();
        res.status(200).json(allPacientes);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
    }
};

exports.postPaciente = async (req, res, next) => {
    try {
        const postResponse = await Paciente.post(req.body.nomePaciente, req.body.cpfPaciente, req.body.leito, req.body.data_internacao, req.body.data_alta);
        res.status(201).json(postResponse);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
    }
};

exports.putPaciente = async (req, res, next) => {
    try {
        const putResponse = await Paciente.update(req.body.idPaciente, req.body.nomePaciente, req.body.cpfPaciente, req.body.leito, req.body.data_internacao, req.body.data_alta);
        res.status(201).json(putResponse);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
    }
};

exports.deletePaciente = async (req, res, next) => {
    try {
        const deleteResponse = await Paciente.delete(req.params.idPaciente);
        res.status(201).json(deleteResponse);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
    }
};
