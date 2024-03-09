import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailConfirmedFormComponent } from './email-confirmed-form.component';

describe('EmailConfirmedFormComponent', () => {
  let component: EmailConfirmedFormComponent;
  let fixture: ComponentFixture<EmailConfirmedFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailConfirmedFormComponent]
    });
    fixture = TestBed.createComponent(EmailConfirmedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
