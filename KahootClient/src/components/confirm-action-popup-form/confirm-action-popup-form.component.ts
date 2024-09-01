import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-confirm-action-popup-form',
  templateUrl: './confirm-action-popup-form.component.html',
  styleUrls: ['./confirm-action-popup-form.component.css']
})
export class ConfirmActionPopupFormComponent {
  @Input() isVisible: boolean = false;
  @Input() flag: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() dataToParent = new EventEmitter<boolean>();

  public closeModal(): void {
    this.close.emit();
  }

  public emitDataToParent(value: boolean): void {
     this.dataToParent.emit(value);
     this.closeModal();
  }
}
