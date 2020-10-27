import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {
  private url = 'http://localhost:8090/api/incidencia';
  constructor(private http: HttpClient) { }

  getIncidenciasById(id:number):Observable<any>{
    const url=`${this.url}/${id}`;

return this.http.get(url);
  }
  registrarIncidencia(data):Observable<any>{
    const url=`${this.url}/registro`;

return this.http.post(url,data);
  }
}
