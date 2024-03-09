import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterPrivateTestCodePopupFormComponent } from './enter-private-test-code-popup-form.component';

describe('EnterPrivateTestCodePopupFormComponent', () => {
  let component: EnterPrivateTestCodePopupFormComponent;
  let fixture: ComponentFixture<EnterPrivateTestCodePopupFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnterPrivateTestCodePopupFormComponent]
    });
    fixture = TestBed.createComponent(EnterPrivateTestCodePopupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
