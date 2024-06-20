import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsHistoryFormComponent } from './points-history-form.component';

describe('PointsHistoryFormComponent', () => {
  let component: PointsHistoryFormComponent;
  let fixture: ComponentFixture<PointsHistoryFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PointsHistoryFormComponent]
    });
    fixture = TestBed.createComponent(PointsHistoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
