import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceForCreatingFormComponent } from './choice-for-creating-form.component';

describe('ChoiceForCreatingFormComponent', () => {
  let component: ChoiceForCreatingFormComponent;
  let fixture: ComponentFixture<ChoiceForCreatingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoiceForCreatingFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoiceForCreatingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
