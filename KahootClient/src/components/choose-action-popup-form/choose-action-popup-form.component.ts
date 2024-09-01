import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-choose-action-popup-form',
  templateUrl: './choose-action-popup-form.component.html',
  styleUrls: ['./choose-action-popup-form.component.css']
})
export class ChooseActionPopupFormComponent {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() actionChosen = new EventEmitter<string>();
  constructor(private el: ElementRef) {}


  public closeModal(): void{
    this.close.emit();
  }

  public toPreview(): void {
    this.chooseAction('watch');
  }

  public toPlay(): void {
    this.chooseAction('play');
  }

  private chooseAction(action: string): void {
    localStorage.setItem("action", action);
    this.actionChosen.emit(action);
  }
}
