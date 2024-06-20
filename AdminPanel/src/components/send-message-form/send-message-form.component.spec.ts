import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMessageFormComponent } from './send-message-form.component';

describe('SendMessageFormComponent', () => {
  let component: SendMessageFormComponent;
  let fixture: ComponentFixture<SendMessageFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendMessageFormComponent]
    });
    fixture = TestBed.createComponent(SendMessageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
