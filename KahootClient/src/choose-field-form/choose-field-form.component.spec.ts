import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseFieldFormComponent } from './choose-field-form.component';

describe('ChooseFieldFormComponent', () => {
  let component: ChooseFieldFormComponent;
  let fixture: ComponentFixture<ChooseFieldFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseFieldFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseFieldFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
