import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActualizadoIncidenciasComponent } from './components/actualizado-incidencias/actualizado-incidencias.component';
import { ContraseniaComponent } from './components/contrasenia/contrasenia.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { IncidenciasComponent } from './components/incidencias/incidencias.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  { path: 'main',component:MainComponent,
children:[
  {path:'incidencias',component:IncidenciasComponent},
  {path:'registro',component:RegistroComponent},
  {path:'reporte',component:ReporteComponent},
  {path:'actualizar',component:ActualizadoIncidenciasComponent},
  {path:'detalle',component:DetalleComponent},
  {path:'registro-usuario',component:RegistroUsuarioComponent},
  {path:'usuarios',component:UsuariosComponent},
  {path:'cambiar-contrasenia',component:ContraseniaComponent},
  {path:'actualizar-usuario/:id',component:RegistroUsuarioComponent},
  { path: '',pathMatch:'full',redirectTo:'incidencias'},
  { path: '**', pathMatch:'full',redirectTo:'incidencias' },
]},
  { path: '',pathMatch:'full',redirectTo:'login'},
  { path: '**', pathMatch:'full',redirectTo:'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
