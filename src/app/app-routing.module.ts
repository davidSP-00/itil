import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncidenciasComponent } from './components/incidencias/incidencias.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ReporteComponent } from './components/reporte/reporte.component';

const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  { path: 'main',component:MainComponent,
children:[
  {path:'incidencias',component:IncidenciasComponent},
  {path:'registro',component:RegistroComponent},
  {path:'reporte',component:ReporteComponent},
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
