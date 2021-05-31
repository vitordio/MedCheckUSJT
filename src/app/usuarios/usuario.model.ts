export interface Usuario {
  idUsuario: string,
  nomeUsuario: string,
  idadeUsuario: Date,
  cpfUsuario: string,
  funcional: string,
  telefone: string,
  password: string
}

export interface UsuarioAuth {
  cpfUsuario: string,
  password: string
}
