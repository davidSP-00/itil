import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {
  usuarioForm: FormGroup;


  actualizando = false;
  usuario: any = {};

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.usuarioForm = this.fb.group({
      nombre: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change'
      }),
      correo: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change'
      }),
      movil: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change'
      }),
      login: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change'
      }),
      clave: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change'
      }),
      sexo: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change'
      }),
      rol: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change'
      }),
      estado: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'change'
      }),
    });
    if (this.route.snapshot.params.id != null) {
      this.obtenerUsuario(this.route.snapshot.params.id);
    }
  }
  obtenerUsuario(id) {
    this.usuarioService.obtenerUsuario(id).subscribe(
      data => {
        this.usuario = data;
      }, (err) => {

      }, () => {
        this.llenarFormulario();
      }
    );
  }
  llenarFormulario() {
    this.usuarioForm.reset(this.usuario)
    this.usuarioForm.get('rol').setValue(this.usuario.rol.id)

  }
  onSubmit() {
    if (this.usuarioForm.invalid) {
      return;
    }
    let data:any = {
      clave: this.usuarioForm.get('clave').value,
      correo: this.usuarioForm.get('correo').value,
      estado: this.usuarioForm.get('estado').value,
      login: this.usuarioForm.get('login').value,
      movil: this.usuarioForm.get('movil').value,
      nombre: this.usuarioForm.get('nombre').value,
      rol: { id: this.usuarioForm.get('rol').value },
      sexo: this.usuarioForm.get('sexo').value,

    }
    if (this.usuario.id != null) {
      data.id =this.usuario.id;
    }
    this.usuarioService.registrarUsuario(data).subscribe(data=>{
      window.alert("Usuario Correctamente Registrado")
    })
  }
}
