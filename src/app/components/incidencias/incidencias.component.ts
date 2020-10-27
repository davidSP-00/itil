import { Component, OnInit } from '@angular/core';
import { IncidenciasService } from 'src/app/services/incidencias.service';

@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.component.html',
  styleUrls: ['./incidencias.component.css']
})
export class IncidenciasComponent implements OnInit {
  incidencias=[];

  constructor(private incidenciasService:IncidenciasService) { }

  ngOnInit(): void {
    this.incidenciasService.getIncidenciasById(1).subscribe(
      data=>{
        console.log(data)
        this.incidencias=data.body;
      }
    )
  }

}
