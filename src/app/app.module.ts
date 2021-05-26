import { BrowserModule } from '@angular/platform-browser';
import { Injectable, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppComponent } from './app.component';
import { PacienteInserirComponent } from './pacientes/paciente-inserir/paciente-inserir.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { PacienteListaComponent } from './pacientes/paciente-lista/paciente-lista.component';

import { PacienteService } from './pacientes/paciente.service';
import { AppRoutingModule } from './app-routing.module';
import { ChatComponent } from './chat/chat/chat.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    PacienteInserirComponent,
    CabecalhoComponent,
    PacienteListaComponent,
    ChatComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
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
    AppRoutingModule
  ],
  providers: [PacienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
