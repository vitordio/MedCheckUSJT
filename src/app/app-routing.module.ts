import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PacienteListaComponent } from './pacientes/paciente-lista/paciente-lista.component';
import { PacienteInserirComponent } from './pacientes/paciente-inserir/paciente-inserir.component';
import { ChatComponent } from './chat/chat/chat.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  { path: "", component: PacienteListaComponent },
  { path: 'criar', component: PacienteInserirComponent },
  { path: 'editar/:idPaciente', component: PacienteInserirComponent },
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
