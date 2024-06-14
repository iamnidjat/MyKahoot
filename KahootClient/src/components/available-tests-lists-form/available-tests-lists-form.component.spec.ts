import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableTestsListsFormComponent } from './available-tests-lists-form.component';

describe('AvailableTestsListsFormComponent', () => {
  let component: AvailableTestsListsFormComponent;
  let fixture: ComponentFixture<AvailableTestsListsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvailableTestsListsFormComponent]
    });
    fixture = TestBed.createComponent(AvailableTestsListsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
