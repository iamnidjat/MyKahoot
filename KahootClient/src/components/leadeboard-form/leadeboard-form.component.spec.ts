import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadeboardFormComponent } from './leadeboard-form.component';

describe('LeadeboardFormComponent', () => {
  let component: LeadeboardFormComponent;
  let fixture: ComponentFixture<LeadeboardFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadeboardFormComponent]
    });
    fixture = TestBed.createComponent(LeadeboardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
