import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedQuizStatsFormComponent } from './created-quiz-stats-form.component';

describe('CreatedQuizStatsFormComponent', () => {
  let component: CreatedQuizStatsFormComponent;
  let fixture: ComponentFixture<CreatedQuizStatsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatedQuizStatsFormComponent]
    });
    fixture = TestBed.createComponent(CreatedQuizStatsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
