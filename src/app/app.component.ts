import { Component, OnInit } from '@angular/core';
import { Paciente } from './pacientes/paciente.model';
import { UsuarioService } from './usuarios/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private usuarioService: UsuarioService) {
  }
  pacientes: Paciente[] = [];
  onPacienteAdicionado(paciente: Paciente) {
    this.pacientes = [...this.pacientes, paciente];
  }

  ngOnInit() {
    this.usuarioService.autenticarAutomaticamente();
  }
}
