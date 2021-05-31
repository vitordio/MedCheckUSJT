import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Usuario } from '../usuario.model';
import { UsuarioService } from '../usuario.service';
import { fromEventPattern } from 'rxjs';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

@Component({
  selector: 'app-usuario-inserir',
  templateUrl: './usuario-inserir.component.html',
  styleUrls: ['./usuario-inserir.component.css']
})
export class UsuarioInserirComponent implements OnInit {

  private modo: string = "criarUsuario";
  private idUsuario!: any;
  public usuario!: any;
  public estaCarregando: boolean = false;

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("idUsuario")) {
        this.modo = "editarUsuario";
        this.idUsuario = paramMap.get("idUsuario");
        this.estaCarregando = true;
        this.usuarioService.getUsuario(this.idUsuario).subscribe(dadosUsu => {
          this.estaCarregando = false;
          this.usuario = {
            idUsuario: dadosUsu._id,
            nomeUsuario: dadosUsu.nomeUsuario,
            idadeUsuario: dadosUsu.idadeUsuario,
            cpfUsuario: dadosUsu.cpfUsuario,
            funcional: dadosUsu.funcional,
            telefone: dadosUsu.telefone,
            password: dadosUsu.password
          }
        })
      } else {
        this.modo = "criarUsuario";
        this.idUsuario = null;
      }
    });
  }
  constructor(public usuarioService: UsuarioService, public route: ActivatedRoute) { }

  onAdicionarUsuario(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.estaCarregando = true;
    if (this.modo === "criarUsuario") {

      this.usuarioService.adicionarUsuario(
        form.value.idUsuario,
        form.value.nomeUsuario,
        form.value.idadeUsuario,
        form.value.cpfUsuario,
        form.value.funcional,
        form.value.telefone,
        form.value.password,
      );
    }
    else {
      this.usuarioService.atualizarUsuario(
        this.idUsuario,
        form.value.nomeUsuario,
        form.value.idadeUsuario,
        form.value.cpfUsuario,
        form.value.funcional,
        form.value.telefone,
        form.value.password
      )
    }
    form.resetForm();
  }
}
