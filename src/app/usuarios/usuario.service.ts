import { Usuario } from './usuario.model';
import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsuarioService implements OnInit, OnDestroy {
  private usuarios: Usuario[] = [];
  private listaUsuariosAtualizada = new Subject<Usuario[]>();
  private autenticado: boolean = false;
  private authObserver!: Subscription;
  private token!: any;
  private tokenTimer!: NodeJS.Timer;
  private authStatusSubject = new Subject<boolean>();
  usuarioService: any;
  public getToken(): string {
    return this.token;
  }
  public isAutenticado(): boolean {
    return this.autenticado;
  }
  constructor(private httpClient: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.authObserver = this.usuarioService.getStatusSubject()
      .subscribe()
  }

  ngOnDestroy(): void {
    this.authObserver.unsubscribe();
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
          next: () => this.router.navigate(['/listarUsuarios']);
          error: () => this.authStatusSubject.next(false)
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
    return this.httpClient.get<{ _id: string, nomeUsuario: string, idadeUsuario: Date, cpfUsuario: string, funcional: string, telefone: string, password: string }>(`http://localhost:3000/api/usuarios/${idUsuario}`);
  }

  getListaDeUsuariosAtualizadaObservable() {
    return this.listaUsuariosAtualizada.asObservable();
  }

  public getStatusSubject() {
    return this.authStatusSubject.asObservable();
  }

  login(idUsuario: string, nomeUsuario: string, idadeUsuario: Date, cpfUsuario: string, funcional: string, telefone: string, password: string) {
    const usuario: Usuario = {
      idUsuario: idUsuario,
      nomeUsuario: nomeUsuario,
      idadeUsuario: idadeUsuario,
      cpfUsuario: cpfUsuario,
      funcional: funcional,
      telefone: telefone,
      password: password
    }
    this.httpClient.post<{ token: string, expiresIn: number }>("http://localhost:3000/api/usuarios/login", usuario).subscribe(resposta => {
      this.token = resposta.token;
      if (this.token) {
        const tempoValidadeToken = resposta.expiresIn;
        this.tokenTimer = setTimeout(() => {
          this.logout()
        }, tempoValidadeToken * 1000);
        this.autenticado = true;
        this.authStatusSubject.next(true);
        this.salvarDadosDeAutenticacao(this.token, new Date(new Date().getTime() +
          tempoValidadeToken * 1000));
        this.router.navigate(['/listarPacientes'])
      }
    })
  }

  private removerDadosDeAutenticacao() {
    localStorage.removeItem('token');
    localStorage.removeItem('validade');
  }

  logout() {
    this.token = null;
    this.authStatusSubject.next(false);
    clearTimeout(this.tokenTimer);
    this.removerDadosDeAutenticacao()
    this.router.navigate(['/login'])
  }

  private salvarDadosDeAutenticacao(token: string, validade: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('validade', validade.toISOString());
  }

  autenticarAutomaticamente() {
    const dadosAutenticacao = this.obterDadosDeAutenticacao();
    if (dadosAutenticacao) {
      //pegamos a data atual
      const agora = new Date();
      //verificamos a diferenca entre a validade e a data atual
      const diferenca = dadosAutenticacao.validade.getTime() - agora.getTime();
      //se a diferença for positiva, o token ainda vale
      console.log(diferenca);
      if (diferenca > 0) {
        this.token = dadosAutenticacao.token;
        console.log(dadosAutenticacao);
        this.autenticado = true;
        //diferença ja esta em milissegundos, não multiplique!
        this.tokenTimer = setTimeout(() => {
          this.logout()
        }, diferenca);
        this.authStatusSubject.next(true);
      }
    }
  }

  private obterDadosDeAutenticacao(){
    const token = localStorage.getItem ('token');
    const validade = localStorage.getItem ('validade');
    const idUsuario = localStorage.getItem ('idUsuario');
    if (token && validade) {
      return {token: token, validade: new Date(validade), idUsuario: idUsuario}
    }
    return null;
  }
}
