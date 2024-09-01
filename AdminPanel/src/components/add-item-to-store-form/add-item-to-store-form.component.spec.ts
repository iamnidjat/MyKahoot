import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemToStoreFormComponent } from './add-item-to-store-form.component';

describe('AddItemToStoreFormComponent', () => {
  let component: AddItemToStoreFormComponent;
  let fixture: ComponentFixture<AddItemToStoreFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddItemToStoreFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddItemToStoreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
