import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatingQuizOptionFormComponent } from './creating-quiz-option-form.component';

describe('CreatingQuizOptionFormComponent', () => {
  let component: CreatingQuizOptionFormComponent;
  let fixture: ComponentFixture<CreatingQuizOptionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatingQuizOptionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatingQuizOptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
