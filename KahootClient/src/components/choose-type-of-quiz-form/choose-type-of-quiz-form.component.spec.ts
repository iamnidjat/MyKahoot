import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseTypeOfQuizFormComponent } from './choose-type-of-quiz-form.component';

describe('ChooseTypeOfQuizFormComponent', () => {
  let component: ChooseTypeOfQuizFormComponent;
  let fixture: ComponentFixture<ChooseTypeOfQuizFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseTypeOfQuizFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseTypeOfQuizFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
