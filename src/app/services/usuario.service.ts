import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = 'http://localhost:8090/api/usuario';
  constructor(private http: HttpClient) { }

  getUusariosByRolId(id:number):Observable<any>{
    const url=`${this.url}/rol/${id}`;

return this.http.get(url);
  }
}
