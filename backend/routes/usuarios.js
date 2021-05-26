const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

router.post('/login', (req, res, next) => {
  Usuario.findOne({ cpfUsuario: req.body.cpfUsuario }).then(u => {
    if (!u) {
      return res.status(401).json({
        mensagem: "CPF inválido"
      })
    }
    return bcrypt.compare(req.body.password, u.password);
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


router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const usuario = new Usuario({
        email: req.body.email,
        password: hash
      })
      usuario.save()
        .then(result => {
          res.status(201).json({
            mensagem: "Usuario criado",
            resultado: result
          });
        })
        .catch(err => {
          res.status(500).json({
            erro: err
          })
        })
    })
});

module.exports = router;
