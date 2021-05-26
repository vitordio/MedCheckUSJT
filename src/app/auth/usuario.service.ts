import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AuthData } from './auth-data.model'
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private httpClient: HttpClient) {
  }
  criarUsuario(cpfUsuario: string, senha: string) {
    const authData: AuthData = {
      cpfUsuario: cpfUsuario,
      password: senha
    }
    this.httpClient.post("http://localhost:3000/api/usuarios/signup", authData).subscribe(resposta => {
      console.log(resposta)
    });
  }
}
