import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEquiposComponent } from './menu-equipos.component';

describe('MenuEquiposComponent', () => {
  let component: MenuEquiposComponent;
  let fixture: ComponentFixture<MenuEquiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuEquiposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
