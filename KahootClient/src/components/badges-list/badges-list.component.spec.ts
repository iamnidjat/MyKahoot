import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgesListComponent } from './badges-list.component';

describe('BadgesListComponent', () => {
  let component: BadgesListComponent;
  let fixture: ComponentFixture<BadgesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BadgesListComponent]
    });
    fixture = TestBed.createComponent(BadgesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
