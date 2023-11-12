import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchQuizFormComponent } from './watch-quiz-form.component';

describe('WatchQuizFormComponent', () => {
  let component: WatchQuizFormComponent;
  let fixture: ComponentFixture<WatchQuizFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WatchQuizFormComponent]
    });
    fixture = TestBed.createComponent(WatchQuizFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
