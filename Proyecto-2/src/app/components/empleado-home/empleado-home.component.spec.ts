import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoHomeComponent } from './empleado-home.component';

describe('EmpleadoHomeComponent', () => {
  let component: EmpleadoHomeComponent;
  let fixture: ComponentFixture<EmpleadoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadoHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
