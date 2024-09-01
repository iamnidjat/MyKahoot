import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserPhotoPopupFormComponent } from './add-user-photo-popup-form.component';

describe('AddUserPhotoPopupFormComponent', () => {
  let component: AddUserPhotoPopupFormComponent;
  let fixture: ComponentFixture<AddUserPhotoPopupFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUserPhotoPopupFormComponent]
    });
    fixture = TestBed.createComponent(AddUserPhotoPopupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
