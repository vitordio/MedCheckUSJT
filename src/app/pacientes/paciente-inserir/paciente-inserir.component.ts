import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Paciente } from '../paciente.model';
import { PacienteService } from '../paciente.service';
import { fromEventPattern } from 'rxjs';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

@Component({
  selector: 'app-paciente-inserir',
  templateUrl: './paciente-inserir.component.html',
  styleUrls: ['./paciente-inserir.component.css']
})
export class PacienteInserirComponent implements OnInit {

  private modo: string = "criarPaciente";
  private idPaciente!: any;
  public paciente!: any;
  public estaCarregando: boolean = false;

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("idPaciente")) {
        this.modo = "editarPaciente";
        this.idPaciente = paramMap.get("idPaciente");
        this.estaCarregando = true;
        this.pacienteService.getPaciente(this.idPaciente).subscribe(dadosPac => {
          this.estaCarregando = false;
          this.paciente = {
            idPaciente: dadosPac._id,
            nomePaciente: dadosPac.nomePaciente,
            cpfPaciente: dadosPac.cpfPaciente,
            idadePaciente: dadosPac.idadePaciente,
            leito: dadosPac.leito,
            data_internacao: dadosPac.data_internacao,
            data_alta: dadosPac.data_alta,
            senha: dadosPac.senha
          }
        })
      } else {
        this.modo = "criarPaciente";
        this.idPaciente = null;
      }
    });
  }
  constructor(public pacienteService: PacienteService, public route: ActivatedRoute) { }

  onAdicionarPaciente(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.estaCarregando = true;
    if (this.modo === "criarPaciente") {
      var senha = Math.random().toString(36).slice(-5);

      this.pacienteService.adicionarPaciente(
        form.value.idPaciente,
        form.value.nomePaciente,
        form.value.cpfPaciente,
        form.value.idadePaciente,
        form.value.leito,
        form.value.data_internacao,
        form.value.data_alta,
        senha,
      );
    }
    else {
      this.pacienteService.atualizarPaciente(
        this.idPaciente,
        form.value.nomePaciente,
        form.value.cpfPaciente,
        form.value.idadePaciente,
        form.value.leito,
        form.value.data_internacao,
        form.value.data_alta,
        form.value.senha
      )
    }
    form.resetForm();
  }
}
