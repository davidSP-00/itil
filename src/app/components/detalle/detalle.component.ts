import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IncidenciasService } from 'src/app/services/incidencias.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  incidencia:any={};
  reporte:any={};
  usuario:any={};
  constructor(private router:Router,
    private incidenciasService:IncidenciasService,
    private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.incidencia=JSON.parse(localStorage.getItem('INCIDENCIA'));
    this.usuario=this.usuarioService.getUsuario;
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
  get puedeReportar(){
    let aux=0;
    if(this.incidencia.usuarioAsigna!=null){
aux=this.incidencia.usuarioAsigna.id;
    }
    return this.usuario.rol.id==aux||this.usuario.rol.id==1 
  }
}
