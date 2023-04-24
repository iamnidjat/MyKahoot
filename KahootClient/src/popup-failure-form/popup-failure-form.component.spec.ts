import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupFailureFormComponent } from './popup-failure-form.component';

describe('PopupFailureFormComponent', () => {
  let component: PopupFailureFormComponent;
  let fixture: ComponentFixture<PopupFailureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupFailureFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupFailureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
