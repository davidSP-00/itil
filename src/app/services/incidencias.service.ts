import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {
  private url = 'https://itilv3.herokuapp.com/api/incidencia';
  constructor(private http: HttpClient) { }

  getIncidenciasById(id:number):Observable<any>{
    const url=`${this.url}/${id}`;

return this.http.get(url);
  }
  registrarIncidencia(data):Observable<any>{
    const url=`${this.url}/registro`;

return this.http.post(url,data);
  }
  actualizarIncidencia(data):Observable<any>{
    const url=`${this.url}/actualizar`;

return this.http.post(url,data);
  }
  reporteIncidencia(data):Observable<any>{
    const url=`${this.url}/reporte`;

return this.http.post(url,data);
  }
  getReporteIncidencia(id:number):Observable<any>{
    const url=`${this.url}/reporte/${id}`;

return this.http.get(url);
  }
  eliminarIncidencia(id:number):Observable<any>{
    const url=`${this.url}/eliminar/${id}`;

return this.http.delete(url);
  }
}
