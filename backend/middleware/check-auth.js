const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.autorizathion.split("")[1];
    const tokenDecodificado = jwt.verify(token, "minhasenha");
    req.dadosUsuario = {
      cpfUsuario: tokenDecodificado.cpfUsuario,
      idUsuario: tokenDecodificado.idUsuario
    }
    next()
  } catch (err) {
    res.status(401).json({
      mensagem: "Problemas com o token. Autenticação não realizada."
    })
  }
}
