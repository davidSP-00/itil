import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
 /*  private url = 'https://itilv3.herokuapp.com/api/usuario'; */
 private url = 'http://localhost:8090/api/usuario';
 usuario:any={};
  constructor(private http: HttpClient) {

   }

  getUsariosByRolId(id:number):Observable<any>{
    const url=`${this.url}/rol/${id}`;

return this.http.get(url);
  }
  loginUsuario(data):Observable<any>{
    const url=`${this.url}/login`;

return this.http.post(url,data);
  }

  registrarUsuario(data):Observable<any>{
    const url=`${this.url}/registrar`;

return this.http.post(url,data);
  }
  get getUsuario(){
    return JSON.parse(localStorage.getItem('USER'));
  }


}
