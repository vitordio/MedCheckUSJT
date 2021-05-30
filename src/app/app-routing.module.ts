import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PacienteListaComponent } from './pacientes/paciente-lista/paciente-lista.component';
import { PacienteInserirComponent } from './pacientes/paciente-inserir/paciente-inserir.component';
import { UsuarioListaComponent } from './usuarios/usuario-lista/usuario-lista.component';
import { UsuarioInserirComponent } from './usuarios/usuario-inserir/usuario-inserir.component';
import { ChatComponent } from './chat/chat/chat.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  { path: 'listarUsuario', component: UsuarioListaComponent },
  { path: 'listarPaciente', component: PacienteListaComponent },
  { path: 'criarPaciente', component: PacienteInserirComponent },
  { path: 'criarUsuario', component: UsuarioInserirComponent },
  { path: 'editarPaciente/:idPaciente', component: PacienteInserirComponent },
  { path: 'editarUsuario/:idUsuario', component: UsuarioInserirComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'chat', component: ChatComponent }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
