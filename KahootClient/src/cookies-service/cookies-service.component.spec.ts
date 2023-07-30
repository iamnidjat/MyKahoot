import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesServiceComponent } from './cookies-service.component';

describe('CookiesServiceComponent', () => {
  let component: CookiesServiceComponent;
  let fixture: ComponentFixture<CookiesServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookiesServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookiesServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
