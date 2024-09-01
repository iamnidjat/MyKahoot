import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowToDownloadPopupFormComponent } from './allow-to-download-popup-form.component';

describe('AllowToDownloadPopupFormComponent', () => {
  let component: AllowToDownloadPopupFormComponent;
  let fixture: ComponentFixture<AllowToDownloadPopupFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllowToDownloadPopupFormComponent]
    });
    fixture = TestBed.createComponent(AllowToDownloadPopupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
