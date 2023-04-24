import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthdaySettingsFormComponent } from './birthday-settings-form.component';

describe('BirthdaySettingsFormComponent', () => {
  let component: BirthdaySettingsFormComponent;
  let fixture: ComponentFixture<BirthdaySettingsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirthdaySettingsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BirthdaySettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
