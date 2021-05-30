import { Usuario } from './usuario.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private usuarios: Usuario[] = [];
  private listaUsuariosAtualizada = new Subject<Usuario[]>();
  constructor(private httpClient: HttpClient, private router: Router) {

  }

  getUsuarios(): void {
    this.httpClient.get<{ mensagem: string, usuarios: any }>('http://localhost:3000/api/usuarios')
      .pipe(map((dados) => {
        return dados.usuarios.map((usuario: any) => {
          return {
            idUsuario: usuario._id,
            nomeUsuario: usuario.nomeUsuario,
            idadeUsuario: usuario.idadeUsuario,
            cpfUsuario: usuario.cpfUsuario,
            funcional: usuario.funcional,
            telefone: usuario.telefone,
            password: usuario.password
          }
        })
      }))
      .subscribe(
        (usuarios) => {
          this.usuarios = usuarios;
          this.listaUsuariosAtualizada.next([...this.usuarios]);
        }
      )
  }

  adicionarUsuario(idUsuario: string, nomeUsuario: string, idadeUsuario: Date, cpfUsuario: string, funcional: string, telefone: string, password: string) {
    const usuario: Usuario = {
      idUsuario: idUsuario,
      nomeUsuario: nomeUsuario,
      idadeUsuario: idadeUsuario,
      cpfUsuario: cpfUsuario,
      funcional: funcional,
      telefone: telefone,
      password: password
    };
    this.httpClient.post<{ mensagem: string }>('http://localhost:3000/api/usuarios',
      usuario).subscribe(
        (dados) => {
          console.log(dados.mensagem);
          this.usuarios.push(usuario);
          this.listaUsuariosAtualizada.next([...this.usuarios]);
          this.router.navigate(['/']);
        }
      )
  }

  atualizarUsuario(idUsuario: string, nomeUsuario: string, idadeUsuario: Date, cpfUsuario: string, funcional: string, telefone: string, password: string) {
    const usuario: Usuario = { idUsuario, nomeUsuario, idadeUsuario, cpfUsuario, funcional, telefone, password };
    this.httpClient.put(`http://localhost:3000/api/usuarios/${idUsuario}`, usuario).
    subscribe((res => {
      const copia = [...this.usuarios];
      const indice = copia.findIndex(pac => pac.idUsuario === usuario.idUsuario);
      copia[indice] = usuario;
      this.usuarios = copia;
      this.listaUsuariosAtualizada.next([...this.usuarios]);
      this.router.navigate(['/']);
    }));
  }


  removerUsuario(idUsuario: string): void {
    this.httpClient.delete(`http://localhost:3000/api/usuarios/${idUsuario}`).subscribe(() => {
      console.log(`Usuario de id: ${idUsuario} removido`);
    });
    this.listaUsuariosAtualizada.next([...this.usuarios]);
  }

  getUsuario(idUsuario: string) {
    return this.httpClient.get<{ _id: string, nomeUsuario: string, idadeUsuario: Date, cpfUsuario: string, funcional: string, telefone: string, password: string}>(`http://localhost:3000/api/usuarios/${idUsuario}`);
  }

  getListaDeUsuariosAtualizadaObservable() {
    return this.listaUsuariosAtualizada.asObservable();
  }
}
