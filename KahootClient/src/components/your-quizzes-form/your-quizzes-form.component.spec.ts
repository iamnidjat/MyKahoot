import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourQuizzesFormComponent } from './your-quizzes-form.component';

describe('YourQuizzesFormComponent', () => {
  let component: YourQuizzesFormComponent;
  let fixture: ComponentFixture<YourQuizzesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourQuizzesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourQuizzesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
