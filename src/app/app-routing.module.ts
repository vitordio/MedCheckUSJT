import { PacienteStatusComponent } from './pacientes/paciente-status/paciente-status.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PacienteListaComponent } from './pacientes/paciente-lista/paciente-lista.component';
import { PacienteInserirComponent } from './pacientes/paciente-inserir/paciente-inserir.component';
import { UsuarioListaComponent } from './usuarios/usuario-lista/usuario-lista.component';
import { UsuarioInserirComponent } from './usuarios/usuario-inserir/usuario-inserir.component';
import { ChatComponent } from './chat/chat/chat.component';
import { LoginComponent } from './auth/login/login.component';
//import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { ProntuarioComponent } from './prontuario/prontuario.component';

const routes: Routes = [
  { path: "prontuario", component: ProntuarioComponent },
  { path: "", component: HomeComponent },
  { path: 'listarUsuario', component: UsuarioListaComponent },
  { path: 'listarPaciente', component: PacienteListaComponent },
  { path: 'criarPaciente', component: PacienteInserirComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'criarUsuario', component: UsuarioInserirComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'editarPaciente/:idPaciente', component: PacienteInserirComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'editarUsuario/:idUsuario', component: UsuarioInserirComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'login', component: LoginComponent },
  { path: 'chat', component: ChatComponent, /*canActivate: [AuthGuard]*/ },
  { path: 'pacienteStatus', component: PacienteStatusComponent }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  /*providers: [AuthGuard]*/

})
export class AppRoutingModule {

}
