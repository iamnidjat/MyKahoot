import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyItemsFormComponent } from './my-items-form.component';

describe('MyItemsFormComponent', () => {
  let component: MyItemsFormComponent;
  let fixture: ComponentFixture<MyItemsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyItemsFormComponent]
    });
    fixture = TestBed.createComponent(MyItemsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
