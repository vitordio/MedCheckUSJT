import { Paciente } from './paciente.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PacienteService {
  private pacientes: Paciente[] = [];
  private listaPacientesAtualizada = new Subject<Paciente[]>();
  constructor(private httpClient: HttpClient, private router: Router) {

  }

  getPacientes(): void {
    this.httpClient.get<{ mensagem: string, pacientes: any }>('http://localhost:3000/api/pacientes')
      .pipe(map((dados) => {
        return dados.pacientes.map((paciente: any) => {
          return {
            idPaciente: paciente._id,
            nomePaciente: paciente.nomePaciente,
            cpfPaciente: paciente.cpfPaciente,
            idadePaciente: paciente.idadePaciente,
            leito: paciente.leito,
            data_internacao: paciente.data_internacao,
            data_alta: paciente.data_alta,
            senha: paciente.senha
          }
        })
      }))
      .subscribe(
        (pacientes) => {
          this.pacientes = pacientes;
          this.listaPacientesAtualizada.next([...this.pacientes]);
        }
      )
  }

  adicionarPaciente(idPaciente: string, nomePaciente: string, cpfPaciente: string, idadePaciente: Date, leito: string, data_internacao: Date, data_alta: Date, senha: string) {
    const paciente: Paciente = {
      idPaciente: idPaciente,
      nomePaciente: nomePaciente,
      cpfPaciente: cpfPaciente,
      idadePaciente: idadePaciente,
      leito: leito,
      data_internacao: data_internacao,
      data_alta: data_alta,
      senha: senha
    };
    this.httpClient.post<{ mensagem: string }>('http://localhost:3000/api/pacientes',
      paciente).subscribe(
        (dados) => {
          console.log(dados.mensagem);
          this.pacientes.push(paciente);
          this.listaPacientesAtualizada.next([...this.pacientes]);
          this.router.navigate(['/']);
        }
      )
  }

  atualizarPaciente(idPaciente: string, nomePaciente: string, cpfPaciente: string, idadePaciente: Date, leito: string, data_internacao: Date, data_alta: Date, senha: string) {
    const paciente: Paciente = { idPaciente, nomePaciente, cpfPaciente, idadePaciente, leito, data_internacao, data_alta, senha };
    this.httpClient.put(`http://localhost:3000/api/pacientes/${idPaciente}`, paciente).subscribe((res => {
      const copia = [...this.pacientes];
      const indice = copia.findIndex(pac => pac.idPaciente === paciente.idPaciente);
      copia[indice] = paciente;
      this.pacientes = copia;
      this.listaPacientesAtualizada.next([...this.pacientes]);
      this.router.navigate(['/']);
    }));
  }


  removerPaciente(idPaciente: string): void {
    this.httpClient.delete(`http://localhost:3000/api/pacientes/${idPaciente}`).subscribe(() => {
      console.log(`Paciente de id: ${idPaciente} removido`);
    });
    this.listaPacientesAtualizada.next([...this.pacientes]);
  }

  getPaciente(idPaciente: string) {
    return this.httpClient.get<{ _id: string, nomePaciente: string, cpfPaciente: string, idadePaciente: Date, leito: string, data_internacao: Date, data_alta: Date, senha: string }>(`http://localhost:3000/api/pacientes/${idPaciente}`);
  }

  getListaDePacientesAtualizadaObservable() {
    return this.listaPacientesAtualizada.asObservable();
  }
}
