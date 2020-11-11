import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { IncidenciasService } from 'src/app/services/incidencias.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { jsPDF} from 'jspdf';
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  incidencia:any={};
  reporte:any={};
  usuario:any={};
  constructor(private router:Router,
    private incidenciasService:IncidenciasService,
    private usuarioService:UsuarioService) { }

  ngOnInit(): void {
    this.incidencia=JSON.parse(localStorage.getItem('INCIDENCIA'));
    this.usuario=this.usuarioService.getUsuario;
    this.incidenciasService.getReporteIncidencia(this.incidencia.id).subscribe(
      data=>{
this.reporte=data.body;
      }
    )
  }

  generarReporte(){
    this.router.navigate(['/main/reporte']);
    
  }
  get puedeReportar(){
    let aux=0;
    if(this.incidencia.usuarioAsigna!=null){
aux=this.incidencia.usuarioAsigna.id;
    }
    return this.usuario.id==aux||this.usuario.rol.id==1||this.usuario.rol.id==3
  }
  descargarPdf(){
    const doc = new jsPDF();
doc.setFont('500');
doc.setFontSize(30)
doc.text( 'Detalle Incidencia',60, 25)

doc.setFontSize(15)
doc.setFont('Arial','bold');
doc.text( 'Nombre Incidencia:',20, 40)
doc.setFont('Arial','500');
doc.text(this.incidencia.nombre?this.incidencia.nombre:'-',70, 40 )

doc.setFont('Arial','bold');
doc.text( 'Fecha:',20,50)
doc.setFont('Arial','500');
doc.text(this.incidencia.fechaAsignada?this.incidencia.fechaAsignada:'-',40,50)
doc.text('12/03/20 30:40:50',90,50)

doc.setFont('Arial','bold');
doc.text('Descripción:',85,60)
doc.setFont('Arial','500');
var lMargin = 30; //left margin in mm
    var rMargin = 30; //right margin in mm
    var pdfInMM = 210;
    var paragraph =this.incidencia.descripcion?this.incidencia.descripcion:'-';
    doc.setFontSize(13)
    var lines = doc.splitTextToSize(paragraph, (pdfInMM - lMargin - rMargin));
    doc.text( lines,lMargin,70);
    
doc.setFontSize(15)
doc.setFont('Arial','bold');
doc.text( 'Origen:',20, 90)
doc.setFont('Arial','500');
doc.text( this.incidencia.origen?this.incidencia.origen:'-',40, 90)



doc.setFont('Arial','bold');
doc.text( 'Tipo:',40, 100,)
doc.text( 'Prioridad:',90, 100,)
doc.text('Estado:',150, 100, )
doc.setFont('Arial','500');
doc.text( this.incidencia.tipoIncidencia?this.incidencia.tipoIncidencia.nombre:'-',40, 110,)
doc.text( this.incidencia.prioridadIncidencia?this.incidencia.prioridadIncidencia.nombre:'-',90, 110,)
doc.text( this.incidencia.estadoIncidencia?this.incidencia.estadoIncidencia.nombre:'-',150, 110,)

doc.setFont('Arial','bold');
doc.text('Asignado a:',20, 120, )
doc.setFont('Arial','500');
doc.text( this.incidencia.usuarioAsigna?this.incidencia.usuarioAsigna.nombre:'-',50, 120,)

doc.text( this.incidencia.usuarioAsigna?this.incidencia.usuarioAsigna.movil:'-',60, 130,)
doc.text( this.incidencia.usuarioAsigna?this.incidencia.usuarioAsigna.correo:'-',130, 130,)


doc.setFont('Arial','bold');
doc.text( 'Causa:',90, 140,)
doc.setFont('Arial','500');
var lMargin = 30; //left margin in mm
    var rMargin = 30; //right margin in mm
    var pdfInMM = 210;
    var paragraph =this.reporte?this.reporte.causa:'-'
    doc.setFontSize(13)
    var lines = doc.splitTextToSize(paragraph, (pdfInMM - lMargin - rMargin));
    doc.text( lines,lMargin, 150,);
    

    
    doc.setFontSize(15)
    doc.setFont('Arial','bold');
doc.text( 'Resolución:',85, 180,)
doc.setFont('Arial','500');
var lMargin = 30; //left margin in mm
    var rMargin = 30; //right margin in mm
    var pdfInMM = 210;
    var paragraph =this.reporte?this.reporte.resolucion:'-'
     doc.setFontSize(13)
    var lines = doc.splitTextToSize(paragraph, (pdfInMM - lMargin - rMargin));
    doc.text( lines,lMargin, 190,);
    
    
    
        doc.setFontSize(15)
    doc.setFont('Arial','bold');
doc.text( 'Observación:',85, 220,)
doc.setFont('Arial','500');
var lMargin = 30; //left margin in mm
    var rMargin = 30; //right margin in mm
    var pdfInMM = 210;
    var paragraph =this.reporte?this.reporte.observacion:'-'
    doc.setFontSize(13)
    var lines = doc.splitTextToSize(paragraph, (pdfInMM - lMargin - rMargin));
    doc.text(lines,lMargin, 230, );

doc.setFontSize(15)
    doc.setFont('Arial','bold');
doc.text('Escalado a:',20, 260, )
doc.setFont('Arial','500');
doc.text( this.incidencia.usuarioEscalado?this.incidencia.usuarioEscalado.nombre:'-',50, 260, )
doc.text( this.incidencia.usuarioEscalado?this.incidencia.usuarioEscalado.movil:'-',60, 270,)
doc.text( this.incidencia.usuarioEscalado?this.incidencia.usuarioEscalado.correo:'-',130, 270,)


doc.save('reporte.pdf')
  }
}
