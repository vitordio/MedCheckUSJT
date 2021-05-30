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


router.post('', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const usuario = new Usuario({
        nomeUsuario: req.body.nomeUsuario,
        idadeUsuario: req.body.idadeUsuario,
        cpfUsuario: req.body.cpfUsuario,
        funcional: req.body.funcional,
        telefone: req.body.telefone,
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

router.get('', (req, res, next) => {
  const pageSize = + req.query.pageSize;
  const page = + req.query.page;
  const consulta = Usuario.find();
  let usuariosEncontrados;
  if (pageSize && page) {
    consulta
      .skip(pageSize * (page - 1))
      .limit(pageSize);
  }
  consulta.then(documents => {
    usuariosEncontrados = documents;
    return Usuario.count();
  })
    .then((count) => {
      res.status(200).json({
        mensagem: "Tudo ok",
        usuarios: usuariosEncontrados,
        maxUsuarios: count
      })
    })
})

router.delete(":/idUsuario", (req, res, next) => {
  Usuario.deleteOne({ _id: req.params.idUsuario }).then((resultado) => {
    console.log(resultado);
    res.status(200).json({ mensagem: "Usuario removido" })
  });
});

router.put("/:idUsuario", (req, res, next) => {
  const usuario = new Usuario({
    _id: req.params.idUsuario,
    nomeUsuario: req.body.nomeUsuario,
    idadeUsuario: req.body.idadeUsuario,
    cpfUsuario: req.body.cpfUsuario,
    funcional: req.body.funcional,
    telefone: req.body.telefone,
    password: hash
  });
  Usuario.updateOne({ _id: req.params.idUsuario }, usuario)
    .then((resultado) => {
      console.log(resultado)
      res.status(200).json({ mensagem: 'Atualização realizada com sucesso.' })
    });
});

router.get('/:idUsuario', (req, res, next) => {
  Usuario.findById(req.params.idUsuario).then(usu => {
    if (usu) {
      res.status(200).json(usu);
    }
    else
      res.status(404).json({ mensagem: "Usuário não encontrado." })
  })
});

module.exports = router;
