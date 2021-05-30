import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from '../usuario.model';
import { UsuarioService } from '../usuario.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-usuario-lista',
  templateUrl: './usuario-lista.component.html',
  styleUrls: ['./usuario-lista.component.css']
})
export class UsuarioListaComponent implements OnInit, OnDestroy {

  usuarios: Usuario[] = [];
  private usuariosSubscription!: Subscription;
  public estaCarregando = false;

  constructor(
    public usuarioService: UsuarioService,
  ) { }

  ngOnDestroy(): void {
    this.usuariosSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.estaCarregando = true;
    this.usuarioService.getUsuarios();
    this.usuariosSubscription = this.usuarioService
      .getListaDeUsuariosAtualizadaObservable()
      .subscribe((usuarios: Usuario[]) => {
        this.estaCarregando = false;
        this.usuarios = usuarios;
      });
  }

  onDelete(idUsuario: string): void {
    this.usuarioService.removerUsuario(idUsuario);
  }

  getAge(idadeUsuario: any) {
    var today = new Date();
    var birthDate = new Date(idadeUsuario);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
