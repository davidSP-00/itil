import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IncidenciasService } from 'src/app/services/incidencias.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.component.html',
  styleUrls: ['./incidencias.component.css']
})
export class IncidenciasComponent implements OnInit {
  incidencias=[];

  usuario:any={};
  constructor(private incidenciasService:IncidenciasService,
    private usuarioService:UsuarioService,
    private router:Router) { }

  ngOnInit(): void {
    this.usuario=this.usuarioService.getUsuario;
   this.getIncidencias();
  }
  actualizar(incidencia){
   
    localStorage.setItem('INCIDENCIA',JSON.stringify(incidencia));
    this.router.navigate(['/main/actualizar']);
  }
  /* eliminar(incidencia,i){
    this.incidencias.splice(i,1);
    this.incidenciasService.eliminarIncidencia(incidencia.id).subscribe(
      data=>{
        window.alert('Eliminado Correctamente');
      }
    )
   

  } */
  generarReporte(incidencia){
    localStorage.setItem('INCIDENCIA',JSON.stringify(incidencia));
    this.router.navigate(['/main/reporte']);
  }
  verDetalles(incidencia){
    localStorage.setItem('INCIDENCIA',JSON.stringify(incidencia));
    this.router.navigate(['/main/detalle']);
  }
  getIncidencias(){
    this.incidenciasService.getIncidenciasById(this.usuario.id).subscribe(
      data=>{
        this.incidencias=data.body;
      }
    )
  }

}
