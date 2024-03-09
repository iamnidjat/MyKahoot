import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseActionPopupFormComponent } from './choose-action-popup-form.component';

describe('ChooseActionPopupFormComponent', () => {
  let component: ChooseActionPopupFormComponent;
  let fixture: ComponentFixture<ChooseActionPopupFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseActionPopupFormComponent]
    });
    fixture = TestBed.createComponent(ChooseActionPopupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
