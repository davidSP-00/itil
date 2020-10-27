import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IncidenciasService } from 'src/app/services/incidencias.service';

@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.component.html',
  styleUrls: ['./incidencias.component.css']
})
export class IncidenciasComponent implements OnInit {
  incidencias=[];

  constructor(private incidenciasService:IncidenciasService,
    private router:Router) { }

  ngOnInit(): void {
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
    this.incidenciasService.getIncidenciasById(1).subscribe(
      data=>{
        console.log(data)
        this.incidencias=data.body;
      }
    )
  }

}
