import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router:Router,
    private fb: FormBuilder,
    private usuarioService:UsuarioService) { }

  ngOnInit(): void {
 this.loginForm = this.fb.group({
      login: new FormControl('', {
        validators:[Validators.required],
        updateOn: 'change',
        
      }),
      clave: new FormControl('', {
        validators:[Validators.required],
        updateOn: 'change'
      }),
    });
  }

  onSubmit(){
    if(this.loginForm.invalid){
return;
    }
    const data={
      login:this.loginForm.get('login').value,
      clave:this.loginForm.get('clave').value,

    }
    this.usuarioService.loginUsuario(data).subscribe(data=>{
      this.router.navigate(['main']);
      localStorage.setItem('USER',JSON.stringify(data));
    },(err)=>{
Swal.fire({
  text:'Credenciales Incorrectas',
  icon:'error'
})

    }
    )
  }

}
