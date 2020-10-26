import { Component, OnInit } from '@angular/core';
import { CV_CONTACT, CV_EXTRA, CV_JOB_EXP, CV_STUDIES, STUDENT, USER } from '../../../constants/ls-keys';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { CurriculumService } from '../../../services/curriculum.service';
import * as moment from 'moment';
import { Calendar,CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {
 

  calendarOptions: CalendarOptions = {
    
    locale: esLocale,
    initialView: 'dayGridMonth',
    events:[
      {title:'1 Postulante',date:'2020-10-05'},
      {
        date:moment(Date.now()).format('YYYY-MM-DD'),
        display: 'background',
        backgroundColor:' #81a0b3'
      },
      {
        date:moment(Date.now()).format('YYYY-MM-DD'),
        display: 'background',
        backgroundColor:' #81a0b3'
      },
      {
        date:moment(Date.now()).format('YYYY-MM-DD'),
        display: 'background',
        backgroundColor:' #81a0b3'
      },
      {
        date:moment(Date.now()).format('YYYY-MM-DD'),
        display: 'background',
        backgroundColor:' #81a0b3'
      },
      
      {
        date:moment(Date.now()).format('YYYY-MM-DD'),
        display: 'background',
        backgroundColor:' #81a0b3'
      },
    ],
    eventColor: '#31465F',
    eventMinHeight:1,
    editable:true,
    eventChange:(a)=>{
      console.log(a);
    }
  };
  calendarOptions2: CalendarOptions = {
    locale: esLocale,
    initialView: 'timeGridDay',
    events:[
      {title:'Primera entrevista',start:'2020-10-05 12:00:00',end:'2020-10-05 12:30:00'},
      {
        date:moment(Date.now()).format('YYYY-MM-DD'),
        display: 'background',
        backgroundColor:'#FAFAFA'
      },
      {
        date:moment(Date.now()).format('YYYY-MM-DD'),
        display: 'background',
        backgroundColor:'#FAFAFA'
      },
      {
        date:moment(Date.now()).format('YYYY-MM-DD'),
        display: 'background',
        backgroundColor:'#FAFAFA'
      },
      {
        date:moment(Date.now()).format('YYYY-MM-DD'),
        display: 'background',
        backgroundColor:'#FAFAFA'
      },
      {
        date:moment(Date.now()).format('YYYY-MM-DD'),
        display: 'background',
        backgroundColor:'#FAFAFA'
      },
      {
        date:moment(Date.now()).format('YYYY-MM-DD'),
        display: 'background',
        backgroundColor:'#FAFAFA'
      },
      {
        date:moment(Date.now()).format('YYYY-MM-DD'),
        display: 'background',
        backgroundColor:'#FAFAFA'
      },
      {
        date:moment(Date.now()).format('YYYY-MM-DD'),
        display: 'background',
        backgroundColor:'#FAFAFA'
      },
      
    ],
    eventColor: '#DAF6F4',
    eventMinHeight:1,
    themeSystem:'bootstrap',
    eventTextColor:'black',
    aspectRatio:1/1.06,
    slotMinTime:"09:00",
    slotMaxTime:"18:00",
    nowIndicatorClassNames:'nowIndicator',
    

    
    

    
  };
  constructor(private fb: FormBuilder,
    private router: Router,
    private curriculumService: CurriculumService) {
      
  }

  ngOnInit() {
  }

}