import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IncidenciasService } from 'src/app/services/incidencias.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;

  soportes=[];
  usuario:any={};
  constructor(private fb: FormBuilder,
    private incidencisService:IncidenciasService,
    private usuarioService:UsuarioService,
    private router:Router) { }

  ngOnInit(): void {
    this.usuario=this.usuarioService.getUsuario;
    this.usuarioService.getUsariosByRolId(2).subscribe(
      data=>{
        this.soportes=data.body;
      }
    )
    this.registroForm = this.fb.group({
      incidencia: new FormControl('', {
        updateOn: 'change'
      }),
      tipoIncidencia: new FormControl('', {
        updateOn: 'change'
      }),
      prioridadIncidencia: new FormControl('', {
        updateOn: 'change'
      }),
      descripcion: new FormControl('', {
        updateOn: 'change'
      }),
      /* estadoIncidencia: new FormControl('', {
        updateOn: 'change'
      }), */
      origen: new FormControl('', {
        updateOn: 'change'
      }),
      /* usuarioAsigna:new FormControl('', {
        updateOn: 'change'
      }), */
     /* area: new FormControl('', {
        validators: Validators.required,
        updateOn: 'change'
      }),  */
    });
  }

  onSubmit() {

const data={
  "descripcion": this.registroForm.get('descripcion').value,
  "estadoIncidencia": {"id": 1},
  "fechaAsignada": moment(new Date()).format('YYYY-MM-DD hh:mm:ss A'),
  "fechaFin": '',
  "fechaInicio": '',
  "nombre": this.registroForm.get('incidencia').value,
  "origen": this.registroForm.get('origen').value,
  /* "prioridadIncidencia": {"id": this.registroForm.get('prioridadIncidencia').value,},
  "tipoIncidencia": {"id": this.registroForm.get('tipoIncidencia').value,}, */
  /* "usuarioAsigna": {"id": this.registroForm.get('usuarioAsigna').value}, */
  "usuarioReporta": {"id":this.usuario.id}
}
this.incidencisService.registrarIncidencia(data).subscribe(data=>{
  Swal.fire({
    icon:'success',
    text:'Incidencia Registrada Correctamente'
  })
  this.router.navigate(['main/incidencias'])
})
  }
}
