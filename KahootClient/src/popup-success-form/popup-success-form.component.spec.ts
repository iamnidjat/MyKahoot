import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSuccessFormComponent } from './popup-success-form.component';

describe('PopupSuccessFormComponent', () => {
  let component: PopupSuccessFormComponent;
  let fixture: ComponentFixture<PopupSuccessFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupSuccessFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupSuccessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
