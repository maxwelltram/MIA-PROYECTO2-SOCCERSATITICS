import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDTComponent } from './menu-dt.component';

describe('MenuDTComponent', () => {
  let component: MenuDTComponent;
  let fixture: ComponentFixture<MenuDTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuDTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
