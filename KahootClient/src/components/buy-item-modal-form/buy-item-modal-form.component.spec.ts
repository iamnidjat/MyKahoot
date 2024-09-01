import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyItemModalFormComponent } from './buy-item-modal-form.component';

describe('BuyItemModalFormComponent', () => {
  let component: BuyItemModalFormComponent;
  let fixture: ComponentFixture<BuyItemModalFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyItemModalFormComponent]
    });
    fixture = TestBed.createComponent(BuyItemModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
