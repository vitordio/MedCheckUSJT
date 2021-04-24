import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  paciente = [
    {nomePaciente: "Sanji", cpfPaciente: "12345678910", leitoPaciente: "B23", datainternPaciente: "24/10/2001", dataaltaPaciente:"23/04/2021"}
  ];
  
  cadastrar (nomePaciente: any, cpfPaciente: any, leitoPaciente: any, datainternPaciente: any, dataaltaPaciente: any){
    this.paciente = [...this.paciente, {nomePaciente:nomePaciente, cpfPaciente:cpfPaciente, leitoPaciente:leitoPaciente, datainternPaciente:datainternPaciente, dataaltaPaciente:dataaltaPaciente}];
  }
}
