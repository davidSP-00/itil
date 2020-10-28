import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as moment from 'moment';
import { IncidenciasService } from 'src/app/services/incidencias.service';
@Component({
  selector: 'app-actualizado-incidencias',
  templateUrl: './actualizado-incidencias.component.html',
  styleUrls: ['./actualizado-incidencias.component.css']
})
export class ActualizadoIncidenciasComponent implements OnInit {
  actualizarForm: FormGroup;

  soportes=[];
  incidencia:any={}
  constructor(private fb: FormBuilder,
    private usuarioService:UsuarioService,
    private incidenciasService:IncidenciasService) { }

  ngOnInit(): void {

    this.incidencia=JSON.parse(localStorage.getItem('INCIDENCIA'));
    this.usuarioService.getUsariosByRolId(2).subscribe(
      data=>{
        console.log(data);
        
        this.soportes=data.body;
        this.llenarFormulario()
      }
    )
    this.actualizarForm = this.fb.group({
      incidencia: new FormControl('', {
        validators:[Validators.required],
        updateOn: 'change'
      }),
      tipoIncidencia: new FormControl('', {
        validators:[Validators.required],
        updateOn: 'change'
      }),
      prioridadIncidencia: new FormControl('', {
        validators:[Validators.required],
        updateOn: 'change'
      }),
      descripcion: new FormControl('', {
        validators:[Validators.required],
        updateOn: 'change'
      }),
      estadoIncidencia: new FormControl('', {
        validators:[Validators.required],
        updateOn: 'change'
      }),
      origen: new FormControl('', {
        validators:[Validators.required],
        updateOn: 'change'
      }),
      usuarioAsigna:new FormControl('', {
        validators:[Validators.required],
        updateOn: 'change'
      }),
     /* area: new FormControl('', {
        validators: Validators.required,
        updateOn: 'change'
      }),  */
    });
  }
  onSubmit(){
    if(this.actualizarForm.invalid){
      return;
    }
    console.log(this.actualizarForm.controls)
    const data={
      "id":this.incidencia.id,
      "descripcion": this.actualizarForm.get('descripcion').value,
      "estadoIncidencia": {"id": this.actualizarForm.get('estadoIncidencia').value},
      "fechaAsignada":this.incidencia.fechaAsignada,
      "fechaFin": this.actualizarForm.get('estadoIncidencia').value=="4"?moment(new Date()).format('YYYY-MM-DD hh:mm:ss'):this.incidencia.fechaFin,
      "fechaInicio": this.actualizarForm.get('estadoIncidencia').value=="2"?moment(new Date()).format('YYYY-MM-DD hh:mm:ss'):this.incidencia.fechaInicio,
      "nombre": this.actualizarForm.get('incidencia').value,
      "origen": this.actualizarForm.get('origen').value,
      "prioridadIncidencia": {"id": this.actualizarForm.get('prioridadIncidencia').value,},
      "tipoIncidencia": {"id": this.actualizarForm.get('tipoIncidencia').value,},
      "usuarioAsigna": {"id": this.actualizarForm.get('usuarioAsigna').value},
      "usuarioReporta": {"id":this.incidencia.usuarioReporta.id}
    }
    console.log(data);
    this.incidenciasService.actualizarIncidencia(data).subscribe(data=>{
      window.alert('incidencia actualizada');
    })

  }

  llenarFormulario(){
    console.log('llenando');
    this.actualizarForm.get('incidencia').setValue(this.incidencia.nombre);
    this.actualizarForm.get('descripcion').setValue(this.incidencia.descripcion);
    this.actualizarForm.get('tipoIncidencia').setValue(this.incidencia.tipoIncidencia.id);
    this.actualizarForm.get('prioridadIncidencia').setValue(this.incidencia.prioridadIncidencia.id);
    console.log(this.incidencia.estadoIncidencia.id)
    this.actualizarForm.get('estadoIncidencia').setValue(this.incidencia.estadoIncidencia.id);
    this.actualizarForm.get('origen').setValue(this.incidencia.origen);
    if(this.incidencia.usuarioAsigna!=null){
      this.actualizarForm.get('usuarioAsigna').setValue(this.incidencia.usuarioAsigna.id)
    }
    
  }
}
