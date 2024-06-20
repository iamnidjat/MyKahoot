import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMessagesFormComponent } from './get-messages-form.component';

describe('GetMessagesFormComponent', () => {
  let component: GetMessagesFormComponent;
  let fixture: ComponentFixture<GetMessagesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetMessagesFormComponent]
    });
    fixture = TestBed.createComponent(GetMessagesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
