import { Component } from '@angular/core';
import { Paciente } from './pacientes/paciente.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pacientes: Paciente[] = [];
  onPacienteAdicionado(paciente: Paciente) {
    this.pacientes = [...this.pacientes, paciente];
  }
}
