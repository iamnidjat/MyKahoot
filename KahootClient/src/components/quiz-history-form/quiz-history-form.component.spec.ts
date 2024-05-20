import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizHistoryFormComponent } from './quiz-history-form.component';

describe('QuizHistoryFormComponent', () => {
  let component: QuizHistoryFormComponent;
  let fixture: ComponentFixture<QuizHistoryFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizHistoryFormComponent]
    });
    fixture = TestBed.createComponent(QuizHistoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
