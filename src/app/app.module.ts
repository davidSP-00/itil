import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IncidenciasComponent } from './components/incidencias/incidencias.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ActualizadoIncidenciasComponent } from './components/actualizado-incidencias/actualizado-incidencias.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
@NgModule({
  declarations: [
    AppComponent,
    IncidenciasComponent,
    NavbarComponent,
    LoginComponent,
    MainComponent,
    RegistroComponent,
    ReporteComponent,
    ActualizadoIncidenciasComponent,
    DetalleComponent,
    RegistroUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
