import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuario:any={}
  constructor() { }

  ngOnInit(): void {
this.usuario=JSON.parse(localStorage.getItem('USER'))
  }

  cerrarSesion(){
    localStorage.clear();
    
  }
}
