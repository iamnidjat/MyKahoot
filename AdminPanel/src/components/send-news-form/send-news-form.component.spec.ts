import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendNewsFormComponent } from './send-news-form.component';

describe('SendNewsFormComponent', () => {
  let component: SendNewsFormComponent;
  let fixture: ComponentFixture<SendNewsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendNewsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendNewsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
