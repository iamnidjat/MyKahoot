import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderModalFormComponent } from './reminder-modal-form.component';

describe('ReminderModalFormComponent', () => {
  let component: ReminderModalFormComponent;
  let fixture: ComponentFixture<ReminderModalFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReminderModalFormComponent]
    });
    fixture = TestBed.createComponent(ReminderModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
