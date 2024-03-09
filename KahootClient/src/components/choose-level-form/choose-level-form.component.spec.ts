import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseLevelFormComponent } from './choose-level-form.component';

describe('ChooseLevelFormComponent', () => {
  let component: ChooseLevelFormComponent;
  let fixture: ComponentFixture<ChooseLevelFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseLevelFormComponent]
    });
    fixture = TestBed.createComponent(ChooseLevelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
