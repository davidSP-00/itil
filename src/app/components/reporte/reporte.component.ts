import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IncidenciasService } from 'src/app/services/incidencias.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  reporteForm: FormGroup;
  incidencia:any={};
  reporte:any={};

  soportes=[];
  constructor(private fb: FormBuilder,
    private incidenciasService:IncidenciasService,
    private usuarioService:UsuarioService,
    private router:Router) { }

  ngOnInit(): void {
    
    this.incidencia=JSON.parse(localStorage.getItem('INCIDENCIA'));
    this.getReporte();
    this.reporteForm=this.fb.group({
      causa: new FormControl('', {
        updateOn: 'change'
      }),
      resolucion: new FormControl('', {
        updateOn: 'change'
      }),
      observacion: new FormControl('', {
        updateOn: 'change'
      }),
      usuarioEscalado: new FormControl('', {
        updateOn: 'change'
      })
    });
  }
  getReporte(){
    this.incidenciasService.getReporteIncidencia(this.incidencia.id).subscribe(
      data=>{
this.reporte=data.body;
this.llenarFormulario();
      }
    ),(err)=>{},()=>{
      
    }
  }
  onSubmit(){
    let data={
      "id":this.incidencia.id,
    "causa":this.reporteForm.get('causa').value,
    "observacion":this.reporteForm.get('resolucion').value,
    "resolucion":this.reporteForm.get('observacion').value
    }
    this.incidenciasService.reporteIncidencia(data).subscribe(
      data=>{
        Swal.fire({
          icon:'success',
          text:'Incidencia Actualizada Correctamente'
        })
        this.router.navigate(['main/detalle'])
      }
    )

  }
  /* getSoportes2(){
    this.usuarioService.getUsariosByRolId(4).subscribe(
      data=>{
        console.log(data);
        
        this.soportes=data.body;
        this.llenarFormulario();
      },(err)=>{},()=>{
        
      }
    );
  } */
  llenarFormulario(){
    this.reporteForm.reset(this.reporte);
  }
}
