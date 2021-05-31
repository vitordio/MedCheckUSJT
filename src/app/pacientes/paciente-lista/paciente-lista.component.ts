import { Component, OnInit, OnDestroy } from '@angular/core';
import { Paciente } from '../paciente.model';
import { PacienteService } from '../paciente.service';
import { Subscription, Observable } from 'rxjs';
import { UsuarioService } from 'src/app/usuarios/usuario.service';

@Component({
  selector: 'app-paciente-lista',
  templateUrl: './paciente-lista.component.html',
  styleUrls: ['./paciente-lista.component.css']
})
export class PacienteListaComponent implements OnInit, OnDestroy {

  pacientes: Paciente[] = [];
  private pacientesSubscription!: Subscription;
  public estaCarregando = false;
  public autenticado: boolean = false;
  private authObserver!: Subscription;

  constructor(
    public pacienteService: PacienteService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.estaCarregando = true;
    this.pacienteService.getPacientes();
    this.pacientesSubscription = this.pacienteService
      .getListaDePacientesAtualizadaObservable()
      .subscribe((pacientes: Paciente[]) => {
        this.estaCarregando = false;
        this.pacientes = pacientes;
      });
      this.autenticado = this.usuarioService.isAutenticado();
    this.authObserver = this.usuarioService.getStatusSubject().
      subscribe((autenticado) => this.autenticado = this.autenticado)
  }

  ngOnDestroy(): void {
    this.pacientesSubscription.unsubscribe();
    this.authObserver.unsubscribe();
  }

  onDelete(idPaciente: string): void {
    this.pacienteService.removerPaciente(idPaciente);
  }

  qualSenha(idPaciente: string, senha: string) {
    alert(`A senha de acesso é: ${senha.toUpperCase()}`)
  }

  getAge(idadePaciente: any) {
    var today = new Date();
    var birthDate = new Date(idadePaciente);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
