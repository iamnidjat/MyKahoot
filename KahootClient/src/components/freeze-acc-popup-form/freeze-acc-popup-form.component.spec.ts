import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreezeAccPopupFormComponent } from './freeze-acc-popup-form.component';

describe('FreezeAccPopupFormComponent', () => {
  let component: FreezeAccPopupFormComponent;
  let fixture: ComponentFixture<FreezeAccPopupFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FreezeAccPopupFormComponent]
    });
    fixture = TestBed.createComponent(FreezeAccPopupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
