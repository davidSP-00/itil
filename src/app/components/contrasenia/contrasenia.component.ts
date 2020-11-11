import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contrasenia',
  templateUrl: './contrasenia.component.html',
  styleUrls: ['./contrasenia.component.css']
})
export class ContraseniaComponent implements OnInit {
usuario:any={};

usuarioForm: FormGroup;
  constructor(private fb: FormBuilder,private usuarioService:UsuarioService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.usuario=this.usuarioService.getUsuario;

    this.usuarioForm = this.fb.group({
      contrasenia: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change'
      }),
      repeatContrasenia: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change'
      }),
    });

  }
  onSubmit() {
    if (this.usuarioForm.invalid ||
      (this.usuarioForm.get('contrasenia').value!=this.usuarioForm.get('repeatContrasenia').value)) {
        if((this.usuarioForm.get('contrasenia').value!=this.usuarioForm.get('repeatContrasenia').value)){
          Swal.fire({
            icon:'error',
            text:'Contraseñas no son iguales'
          })
        }
      return;
    }
    let data:any = {
      clave: this.usuarioForm.get('contrasenia').value,
      correo: this.usuario.correo,
      estado: this.usuario.estado,
      login: this.usuario.login,
      movil: this.usuario.movil,
      nombre: this.usuario.nombre,
      rol: { id: this.usuario.rol.id },
      sexo: this.usuario.sexo,
    }
    if (this.usuario.id != null) {
      data.id =this.usuario.id;
    }
    this.usuarioService.registrarUsuario(data).subscribe(data=>{
      Swal.fire({
        icon:'success',
        text:'Contraseña Cambiada Correctamente'
      })
    })
  }
}
