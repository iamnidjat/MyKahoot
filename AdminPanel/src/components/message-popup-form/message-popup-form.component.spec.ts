import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagePopupFormComponent } from './message-popup-form.component';

describe('MessagePopupFormComponent', () => {
  let component: MessagePopupFormComponent;
  let fixture: ComponentFixture<MessagePopupFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessagePopupFormComponent]
    });
    fixture = TestBed.createComponent(MessagePopupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
