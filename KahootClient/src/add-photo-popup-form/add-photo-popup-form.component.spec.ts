import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhotoPopupFormComponent } from './add-photo-popup-form.component';

describe('AddPhotoPopupFormComponent', () => {
  let component: AddPhotoPopupFormComponent;
  let fixture: ComponentFixture<AddPhotoPopupFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPhotoPopupFormComponent]
    });
    fixture = TestBed.createComponent(AddPhotoPopupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
