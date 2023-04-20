import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsChoiceFormComponent } from './settings-choice-form.component';

describe('SettingsChoiceFormComponent', () => {
  let component: SettingsChoiceFormComponent;
  let fixture: ComponentFixture<SettingsChoiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsChoiceFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsChoiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
