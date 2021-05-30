const express = require("express");
const router = express.Router();
const Paciente = require('../models/paciente');
const bcrypt = require('bcrypt');

router.post('/login', (req, res, next) => {
  Paciente.findOne({ cpfPaciente: req.body.cpfPaciente }).then(u => {
    if (!u) {
      return res.status(401).json({
        mensagem: "CPF inválido"
      })
    }
    return bcrypt.compare(req.body.senha, u.senha);
  })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          mensagem: "senha inválida"
        })
      }
    })
    .catch(err => {
      return res.status(401).json({
        mensagem: "Login falhou: " + err
      })
    })
})

router.post('', (req, res, next) => {
      const paciente = new Paciente({
        nomePaciente: req.body.nomePaciente,
        cpfPaciente: req.body.cpfPaciente,
        idadePaciente: req.body.idadePaciente,
        leito: req.body.leito,
        data_internacao: req.body.data_internacao,
        data_alta: req.body.data_alta,
        senha: req.body.senha
      })
      paciente.save()
      .then(pacienteInserido => {
          res.status(201).json({
            mensagem: "Paciente criado",
            idPaciente: pacienteInserido._id
          });
        })
        .catch(err => {
          res.status(500).json({
            erro: err
          })
        })
});

router.get('', (req, res, next) => {
  const pageSize = + req.query.pageSize;
  const page = + req.query.page;
  const consulta = Paciente.find();
  let pacientesEncontrados;
  if (pageSize && page) {
    consulta
      .skip(pageSize * (page - 1))
      .limit(pageSize);
  }
  consulta.then(documents => {
    pacientesEncontrados = documents;
    return Paciente.count();
  })
    .then((count) => {
      res.status(200).json({
        mensagem: "Tudo ok",
        pacientes: pacientesEncontrados,
        maxPacientes: count
      })
    })
})

router.delete("/:idPaciente", (req, res, next) => {
  Paciente.deleteOne({ _id: req.params.idPaciente }).then((resultado) => {
    console.log(resultado);
    res.status(200).json({ mensagem: "Paciente removido" })
  });
});

router.put("/:idPaciente", (req, res, next) => {
  const paciente = new Paciente({
    _id: req.params.idPaciente,
    nomePaciente: req.body.nomePaciente,
    cpfPaciente: req.body.cpfPaciente,
    idadePaciente: req.body.idadePaciente,
    leito: req.body.leito,
    data_internacao: req.body.data_internacao,
    data_alta: req.body.data_alta,
    senha: req.body.senha
  });
  Paciente.updateOne({ _id: req.params.idPaciente }, paciente)
    .then((resultado) => {
      console.log(resultado)
      res.status(200).json({ mensagem: 'Atualização realizada com sucesso.' })
    });
});

router.get('/:idPaciente', (req, res, next) => {
  Paciente.findById(req.params.idPaciente).then(pac => {
    if (pac) {
      res.status(200).json(pac);
    }
    else
      res.status(404).json({ mensagem: "Paciente não encontrado." })
  })
});

module.exports = router;
