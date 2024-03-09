import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAccFormComponent } from './delete-acc-form.component';

describe('DeleteAccFormComponent', () => {
  let component: DeleteAccFormComponent;
  let fixture: ComponentFixture<DeleteAccFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteAccFormComponent]
    });
    fixture = TestBed.createComponent(DeleteAccFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
