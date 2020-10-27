import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IncidenciasService } from 'src/app/services/incidencias.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  incidencia:any={};
  reporte:any={};
  constructor(private router:Router,
    private incidenciasService:IncidenciasService) { }

  ngOnInit(): void {
    this.incidencia=JSON.parse(localStorage.getItem('INCIDENCIA'));
    this.incidenciasService.getReporteIncidencia(this.incidencia.id).subscribe(
      data=>{
        console.log(data);
this.reporte=data.body;
      }
    )
  }

  generarReporte(){
    this.router.navigate(['/main/reporte']);
    
  }
}
