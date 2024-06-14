import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatingTestFormComponent } from './creating-test-form.component';

describe('CreatingTestFormComponent', () => {
  let component: CreatingTestFormComponent;
  let fixture: ComponentFixture<CreatingTestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatingTestFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatingTestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
