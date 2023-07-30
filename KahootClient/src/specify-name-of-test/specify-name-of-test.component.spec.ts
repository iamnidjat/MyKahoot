import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecifyNameOfTestComponent } from './specify-name-of-test.component';

describe('SpecifyNameOfTestComponent', () => {
  let component: SpecifyNameOfTestComponent;
  let fixture: ComponentFixture<SpecifyNameOfTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecifyNameOfTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecifyNameOfTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
