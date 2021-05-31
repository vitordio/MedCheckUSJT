import { BrowserModule } from '@angular/platform-browser';
import { Injectable, NgModule } from '@angular/core';
import { FormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//import { AuthInterceptor } from './auth/auth-interceptor';

import {MatMenu, MatMenuModule} from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import {MatList, MatListModule} from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppComponent } from './app.component';
import { PacienteInserirComponent } from './pacientes/paciente-inserir/paciente-inserir.component';
import { PacienteListaComponent } from './pacientes/paciente-lista/paciente-lista.component';
import { UsuarioInserirComponent } from './usuarios/usuario-inserir/usuario-inserir.component';
import { UsuarioListaComponent } from './usuarios/usuario-lista/usuario-lista.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { ErroInterceptor } from './erro-interceptor';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDividerModule} from '@angular/material/divider';


import { PacienteService } from './pacientes/paciente.service';
import { AppRoutingModule } from './app-routing.module';
import { ChatComponent } from './chat/chat/chat.component';
import { LoginComponent } from './auth/login/login.component';
import { ErroComponent } from './erro/erro/erro.component';
import { PacienteStatusComponent } from './pacientes/paciente-status/paciente-status.component';
import { ProntuarioComponent } from './prontuario/prontuario.component';


@NgModule({
  declarations: [
    AppComponent,
    PacienteInserirComponent,
    CabecalhoComponent,
    PacienteListaComponent,
    ChatComponent,
    LoginComponent,
    UsuarioInserirComponent,
    UsuarioListaComponent,
    ErroComponent,
    PacienteStatusComponent,
    ProntuarioComponent,
  ],
  imports: [
    MatMenuModule,
    MatDividerModule,
    MatListModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatDialogModule,
    AppRoutingModule,
    MatStepperModule
  ],
  providers: [
    //{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: ErroInterceptor, multi: true },

  ],
  bootstrap: [AppComponent],
  entryComponents: [ErroComponent]
})
export class AppModule { }
