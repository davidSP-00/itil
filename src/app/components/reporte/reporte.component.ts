import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IncidenciasService } from 'src/app/services/incidencias.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  reporteForm: FormGroup;
  incidencia:any={};
  constructor(private fb: FormBuilder,
    private incidenciasService:IncidenciasService,
    private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.incidencia=JSON.parse(localStorage.getItem('INCIDENCIA'));
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
      escalado: new FormControl('', {
        updateOn: 'change'
      })
    });
  }
  onSubmit(){
    const data={
      "id":this.incidencia.id,
    "causa":this.reporteForm.get('causa').value,
    "observacion":this.reporteForm.get('resolucion').value,
    "resolucion":this.reporteForm.get('observacion').value,
    "escalado":this.reporteForm.get('escalado').value
    }
    console.log(data);
    console.log('Reportando')
    this.incidenciasService.reporteIncidencia(data).subscribe(
      data=>{
        window.alert('Incidencia reportada');
      }
    )

  }

}
