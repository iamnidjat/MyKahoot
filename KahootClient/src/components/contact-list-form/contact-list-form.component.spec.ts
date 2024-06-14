import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListFormComponent } from './contact-list-form.component';

describe('ContactListFormComponent', () => {
  let component: ContactListFormComponent;
  let fixture: ComponentFixture<ContactListFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactListFormComponent]
    });
    fixture = TestBed.createComponent(ContactListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
