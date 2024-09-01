import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetItemsFormComponent } from './get-items-form.component';

describe('GetItemsFormComponent', () => {
  let component: GetItemsFormComponent;
  let fixture: ComponentFixture<GetItemsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetItemsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetItemsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
