import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MykahootStoreFormComponent } from './mykahoot-store-form.component';

describe('MykahootStoreFormComponent', () => {
  let component: MykahootStoreFormComponent;
  let fixture: ComponentFixture<MykahootStoreFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MykahootStoreFormComponent]
    });
    fixture = TestBed.createComponent(MykahootStoreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
