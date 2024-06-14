import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAccPopupFormComponent } from './delete-acc-popup-form.component';

describe('DeleteAccPopupFormComponent', () => {
  let component: DeleteAccPopupFormComponent;
  let fixture: ComponentFixture<DeleteAccPopupFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteAccPopupFormComponent]
    });
    fixture = TestBed.createComponent(DeleteAccPopupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
