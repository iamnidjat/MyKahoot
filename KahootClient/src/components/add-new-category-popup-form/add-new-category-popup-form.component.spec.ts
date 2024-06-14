import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCategoryPopupFormComponent } from './add-new-category-popup-form.component';

describe('AddNewCategoryPopupFormComponent', () => {
  let component: AddNewCategoryPopupFormComponent;
  let fixture: ComponentFixture<AddNewCategoryPopupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewCategoryPopupFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewCategoryPopupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
