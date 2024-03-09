import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableTestsStatsFormComponent } from './available-tests-stats-form.component';

describe('AvailableTestsStatsFormComponent', () => {
  let component: AvailableTestsStatsFormComponent;
  let fixture: ComponentFixture<AvailableTestsStatsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvailableTestsStatsFormComponent]
    });
    fixture = TestBed.createComponent(AvailableTestsStatsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
