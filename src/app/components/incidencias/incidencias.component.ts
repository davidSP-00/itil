import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IncidenciasService } from 'src/app/services/incidencias.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as STYLEJS from 'sheetjs-style-v2';
import { saveAs } from 'file-saver';
import * as moment from 'moment';
@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.component.html',
  styleUrls: ['./incidencias.component.css']
})
export class IncidenciasComponent implements OnInit {
  p:number=1;
  incidencias=[];
  incidenciasFiltradas=[];

  mes='';
  prioridad='';
  tipo='';
  estado='';

  usuario:any={};
  constructor(private incidenciasService:IncidenciasService,
    private usuarioService:UsuarioService,
    private router:Router) { }

  ngOnInit(): void {
    this.usuario=this.usuarioService.getUsuario;
   this.getIncidencias();
  }
  actualizar(incidencia){
   
    localStorage.setItem('INCIDENCIA',JSON.stringify(incidencia));
    this.router.navigate(['/main/actualizar']);
  }
  /* eliminar(incidencia,i){
    this.incidencias.splice(i,1);
    this.incidenciasService.eliminarIncidencia(incidencia.id).subscribe(
      data=>{
        window.alert('Eliminado Correctamente');
      }
    )
   

  } */
  generarReporte(incidencia){
    localStorage.setItem('INCIDENCIA',JSON.stringify(incidencia));
    this.router.navigate(['/main/reporte']);
  }
  verDetalles(incidencia){
    localStorage.setItem('INCIDENCIA',JSON.stringify(incidencia));
    this.router.navigate(['/main/detalle']);
  }
  getIncidencias(){
    this.incidenciasService.getIncidenciasById(this.usuario.id).subscribe(
      data=>{
        this.incidencias=data.body;
        this.incidenciasFiltradas=data.body;
        this.incidenciasFiltradas.reverse();
      }
    )
  }
  s2ab(s) { 
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;    
}
  excelIncidencias(){
    let a=[];
    let b=[]
    b.push(['#','Nombre','Descripcion','Estado','Prioridad','Tipo','Fecha Inicio','Fecha Fin','Area','Registrado por','Asignado a',]);

    let i=1;
    this.incidencias.forEach(incidencia=>{
      a.push(i);
      a.push(incidencia.nombre?incidencia.nombre:'-');
      a.push(incidencia.descripcion?incidencia.descripcion:'-');
      a.push(incidencia.estadoIncidencia?incidencia.estadoIncidencia.nombre:'-');
      a.push(incidencia.prioridadIncidencia?incidencia.prioridadIncidencia.nombre:'-');
      a.push(incidencia.tipoIncidencia?incidencia.tipoIncidencia.nombre:'-');
      a.push(incidencia.fechaInicio?incidencia.fechaInicio:'-');
      a.push(incidencia.fechaFin?incidencia.fechaFin:'-');
      a.push(incidencia.origen?incidencia.origen:'-');
      a.push(incidencia.usuarioReporta?incidencia.usuarioReporta.nombre:'-');
      a.push(incidencia.usuarioAsigna?incidencia.usuarioAsigna.nombre:'-');
      b.push(a);
      a=[];
      i++;
    })

    var wb = STYLEJS.utils.book_new();
      
    wb.Props={
      Title:"Reporte de Incidencias",
      Subject:"Reporte",
      Author:"Vipusa",
      CreatedDate:new Date()
    }
    
    wb.SheetNames.push("REPORTE");
    
    wb.Sheets["REPORTE"]=STYLEJS.utils.aoa_to_sheet(b);

    var wscols = [
      {width:4},
      {width:20},
      {width:30},
      {width:10},
      {width:10},
      {width:10},
      {width:18},
      {width:18},
      {width:20},
      {width:15},
      {width:15},
  ];
  wb.Sheets["REPORTE"]["!cols"] = wscols;

    const tableStyle={									// set the style for target cell
      font: {
        name: 'Arial',
        bold: false
      },
      fill: {
        fgColor:{rgb:"A6D4FF"}
      },
      border:{
        top:{style:'medium'},
        bottom:{style:'medium'},
        left:{style:'medium'},
        right:{style:'medium'},
      }
    };
    wb.Sheets["REPORTE"]["A1"].s=
    wb.Sheets["REPORTE"]["B1"].s=
    wb.Sheets["REPORTE"]["C1"].s=
    wb.Sheets["REPORTE"]["D1"].s=
    wb.Sheets["REPORTE"]["E1"].s=
    wb.Sheets["REPORTE"]["F1"].s=
    wb.Sheets["REPORTE"]["G1"].s=
    wb.Sheets["REPORTE"]["H1"].s=
    wb.Sheets["REPORTE"]["I1"].s=
    wb.Sheets["REPORTE"]["J1"].s=
    wb.Sheets["REPORTE"]["K1"].s=tableStyle; 
    var wbout = STYLEJS.write(wb, {bookType:'xlsx',  bookSST:true,  type: 'binary'});

    saveAs(new Blob([this.s2ab(wbout)],{type:"application/octet-stream"}), 'Reporte Incidencias.xlsx');
  }
  filtrarIncidencias(){
    this.incidenciasFiltradas=this.incidencias.filter(incidencia=>{
      let month=moment(incidencia.fechaAsignada).format('MM')
      if(this.mes==''){
return incidencia;
      }
      if(month==this.mes){
        return incidencia;
      }
    })
    this.incidenciasFiltradas=this.incidenciasFiltradas.filter(incidencia=>{
      if(this.tipo==''){
return incidencia;
      }
      if(incidencia.tipoIncidencia){
        if(this.tipo==incidencia.tipoIncidencia.id){
          return incidencia;
        }
      }
      
    })
    this.incidenciasFiltradas=this.incidenciasFiltradas.filter(incidencia=>{
      if(this.prioridad==''){
return incidencia;
      }
      if(incidencia.prioridadIncidencia){
        if(this.prioridad==incidencia.prioridadIncidencia.id){
          return incidencia;
        }
      }
      
    })
    this.incidenciasFiltradas=this.incidenciasFiltradas.filter(incidencia=>{
      if(this.estado==''){
return incidencia;
      }
      if(incidencia.estadoIncidencia){
        if(this.estado==incidencia.estadoIncidencia.id){
          return incidencia;
        }
      }
      
    })
  }
}
