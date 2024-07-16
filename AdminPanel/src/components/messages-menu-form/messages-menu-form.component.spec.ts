import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesMenuFormComponent } from './messages-menu-form.component';

describe('MessagesMenuFormComponent', () => {
  let component: MessagesMenuFormComponent;
  let fixture: ComponentFixture<MessagesMenuFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagesMenuFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesMenuFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
