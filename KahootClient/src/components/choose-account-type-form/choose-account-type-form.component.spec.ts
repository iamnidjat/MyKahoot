import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseAccountTypeFormComponent } from './choose-account-type-form.component';

describe('ChooseAccountTypeFormComponent', () => {
  let component: ChooseAccountTypeFormComponent;
  let fixture: ComponentFixture<ChooseAccountTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseAccountTypeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseAccountTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
