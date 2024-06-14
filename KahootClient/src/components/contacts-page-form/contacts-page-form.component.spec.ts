import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsPageFormComponent } from './contacts-page-form.component';

describe('ContactsPageFormComponent', () => {
  let component: ContactsPageFormComponent;
  let fixture: ComponentFixture<ContactsPageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactsPageFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactsPageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
