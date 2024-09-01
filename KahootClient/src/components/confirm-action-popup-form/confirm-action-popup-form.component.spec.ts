import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmActionPopupFormComponent } from './confirm-action-popup-form.component';

describe('ConfirmActionPopupFormComponent', () => {
  let component: ConfirmActionPopupFormComponent;
  let fixture: ComponentFixture<ConfirmActionPopupFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmActionPopupFormComponent]
    });
    fixture = TestBed.createComponent(ConfirmActionPopupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
