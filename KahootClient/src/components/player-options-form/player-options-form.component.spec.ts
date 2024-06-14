import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerOptionsFormComponent } from './player-options-form.component';

describe('PlayerOptionsFormComponent', () => {
  let component: PlayerOptionsFormComponent;
  let fixture: ComponentFixture<PlayerOptionsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerOptionsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerOptionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
