import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesListFormComponent } from './quizzes-list-form.component';

describe('QuizzesListFormComponent', () => {
  let component: QuizzesListFormComponent;
  let fixture: ComponentFixture<QuizzesListFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizzesListFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizzesListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
