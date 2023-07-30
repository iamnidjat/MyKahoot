import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarchartFormComponent } from './barchart-form.component';

describe('BarchartFormComponent', () => {
  let component: BarchartFormComponent;
  let fixture: ComponentFixture<BarchartFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarchartFormComponent]
    });
    fixture = TestBed.createComponent(BarchartFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
