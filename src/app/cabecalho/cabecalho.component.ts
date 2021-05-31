import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuarioService } from '../usuarios/usuario.service';
@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit, OnDestroy {
  private authObserver!: Subscription;
  public autenticado: boolean = false;
  constructor(
    private usuarioService: UsuarioService
  ) { }
  ngOnInit(): void {
    this.autenticado = this.usuarioService.isAutenticado();
    this.authObserver =
      this.usuarioService.getStatusSubject().
        subscribe((autenticado) => {
          this.autenticado = autenticado;
        })
  }
  ngOnDestroy() {
    this.authObserver.unsubscribe();
  }

  onLogout(){
    this.usuarioService.logout();
  }
}
