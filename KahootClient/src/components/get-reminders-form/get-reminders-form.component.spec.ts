import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetRemindersFormComponent } from './get-reminders-form.component';

describe('GetRemindersFormComponent', () => {
  let component: GetRemindersFormComponent;
  let fixture: ComponentFixture<GetRemindersFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetRemindersFormComponent]
    });
    fixture = TestBed.createComponent(GetRemindersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
