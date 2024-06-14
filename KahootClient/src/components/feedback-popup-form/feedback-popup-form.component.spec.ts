import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackPopupFormComponent } from './feedback-popup-form.component';

describe('FeedbackPopupFormComponent', () => {
  let component: FeedbackPopupFormComponent;
  let fixture: ComponentFixture<FeedbackPopupFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackPopupFormComponent]
    });
    fixture = TestBed.createComponent(FeedbackPopupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
