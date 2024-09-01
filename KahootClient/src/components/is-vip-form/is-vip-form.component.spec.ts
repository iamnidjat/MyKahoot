import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsVipFormComponent } from './is-vip-form.component';

describe('IsVipFormComponent', () => {
  let component: IsVipFormComponent;
  let fixture: ComponentFixture<IsVipFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IsVipFormComponent]
    });
    fixture = TestBed.createComponent(IsVipFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
