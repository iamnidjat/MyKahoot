import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarFormComponent } from './navbar-form.component';

describe('NavbarFormComponent', () => {
  let component: NavbarFormComponent;
  let fixture: ComponentFixture<NavbarFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
