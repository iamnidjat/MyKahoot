import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollToTopFormComponent } from './scroll-to-top-form.component';

describe('ScrollToTopFormComponent', () => {
  let component: ScrollToTopFormComponent;
  let fixture: ComponentFixture<ScrollToTopFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrollToTopFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollToTopFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
