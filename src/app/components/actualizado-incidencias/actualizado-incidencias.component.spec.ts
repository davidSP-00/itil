import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizadoIncidenciasComponent } from './actualizado-incidencias.component';

describe('ActualizadoIncidenciasComponent', () => {
  let component: ActualizadoIncidenciasComponent;
  let fixture: ComponentFixture<ActualizadoIncidenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizadoIncidenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizadoIncidenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
