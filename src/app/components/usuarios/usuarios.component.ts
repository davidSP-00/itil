import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios=[]

  constructor(private usuarioService:UsuarioService,
    private router:Router) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
    
  }
obtenerUsuarios(){
  this.usuarioService.obtenerUsuarios().subscribe((data:any)=>{
  this.usuarios=data.body;
  })
}
actualizar(usuario){
  this.router.navigate([`main/actualizar-usuario/${usuario.id}`])

}
}
