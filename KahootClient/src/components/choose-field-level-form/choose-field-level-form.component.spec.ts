import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseFieldLevelFormComponent } from './choose-field-level-form.component';

describe('ChooseFieldLevelFormComponent', () => {
  let component: ChooseFieldLevelFormComponent;
  let fixture: ComponentFixture<ChooseFieldLevelFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseFieldLevelFormComponent]
    });
    fixture = TestBed.createComponent(ChooseFieldLevelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
