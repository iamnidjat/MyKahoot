import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestProcessComponent } from './test-process.component';

describe('TestProcessComponent', () => {
  let component: TestProcessComponent;
  let fixture: ComponentFixture<TestProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
