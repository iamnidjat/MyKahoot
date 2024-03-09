import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSurveyChoosingFormComponent } from './player-survey-choosing-form.component';

describe('PlayerSurveyChoosingFormComponent', () => {
  let component: PlayerSurveyChoosingFormComponent;
  let fixture: ComponentFixture<PlayerSurveyChoosingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerSurveyChoosingFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerSurveyChoosingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
