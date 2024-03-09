import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDashboardFormComponent } from './profile-dashboard-form.component';

describe('ProfileDashboardFormComponent', () => {
  let component: ProfileDashboardFormComponent;
  let fixture: ComponentFixture<ProfileDashboardFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileDashboardFormComponent]
    });
    fixture = TestBed.createComponent(ProfileDashboardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
