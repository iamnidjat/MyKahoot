import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Top10FormComponent } from './top10-form.component';

describe('Top10FormComponent', () => {
  let component: Top10FormComponent;
  let fixture: ComponentFixture<Top10FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Top10FormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Top10FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
