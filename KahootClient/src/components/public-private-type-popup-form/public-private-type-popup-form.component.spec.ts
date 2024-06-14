import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicPrivateTypePopupFormComponent } from './public-private-type-popup-form.component';

describe('PublicPrivateTypePopupFormComponent', () => {
  let component: PublicPrivateTypePopupFormComponent;
  let fixture: ComponentFixture<PublicPrivateTypePopupFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicPrivateTypePopupFormComponent]
    });
    fixture = TestBed.createComponent(PublicPrivateTypePopupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
