import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsAndTop10ResultsFormComponent } from './stats-and-top10-results-form.component';

describe('StatsAndTop10ResultsFormComponent', () => {
  let component: StatsAndTop10ResultsFormComponent;
  let fixture: ComponentFixture<StatsAndTop10ResultsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsAndTop10ResultsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsAndTop10ResultsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
