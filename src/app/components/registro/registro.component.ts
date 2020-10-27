import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IncidenciasService } from 'src/app/services/incidencias.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;

  soportes=[];
  constructor(private fb: FormBuilder,
    private incidencisService:IncidenciasService,
    private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.getUusariosByRolId(2).subscribe(
      data=>{
        console.log(data);
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
      estadoIncidencia: new FormControl('', {
        updateOn: 'change'
      }),
      origen: new FormControl('', {
        updateOn: 'change'
      }),
      usuarioAsigna:new FormControl('', {
        updateOn: 'change'
      }),
     /* area: new FormControl('', {
        validators: Validators.required,
        updateOn: 'change'
      }),  */
    });
  }

  onSubmit() {
console.log(this.registroForm)

const data={
  "descripcion": this.registroForm.get('descripcion').value,
  "estadoIncidencia": {"id": this.registroForm.get('estadoIncidencia').value},
  "fechaAsignada": "2020-10-25 18:00:00",
  "fechaFin": "2020-10-25 20:00:00",
  "fechaInicio": "2020-10-25 18:00:00",
  "nombre": this.registroForm.get('incidencia').value,
  "origen": this.registroForm.get('origen').value,
  "prioridadIncidencia": {"id": this.registroForm.get('prioridadIncidencia').value,},
  "tipoIncidencia": {"id": this.registroForm.get('tipoIncidencia').value,},
  "usuarioAsigna": {"id": this.registroForm.get('usuarioAsigna').value},
  "usuarioReporta": {"id": 1}
}
console.log(data);
this.incidencisService.registrarIncidencia(data).subscribe(data=>{
  window.alert('incidencia subscripta');
})
  }
}
