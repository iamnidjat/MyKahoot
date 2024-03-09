import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAllowedPageFormComponent } from './not-allowed-page-form.component';

describe('NotAllowedPageFormComponent', () => {
  let component: NotAllowedPageFormComponent;
  let fixture: ComponentFixture<NotAllowedPageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotAllowedPageFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotAllowedPageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
