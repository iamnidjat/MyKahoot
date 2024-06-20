import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import {GetMessagesFormComponent} from "../get-messages-form/get-messages-form.component";
import {Router, RouterLink} from "@angular/router";
import {Message} from "../../models/Message";
import {DatePipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-message-popup-form',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    DatePipe
  ],
  templateUrl: './message-popup-form.component.html',
  styleUrls: ['./message-popup-form.component.css']
})
export class MessagePopupFormComponent {
  @Output() closePopup = new EventEmitter<void>();
  @Input() message!: Message;
  constructor(private el: ElementRef, private router: Router) {}

  public closePopUp(): void {
    let modal = this.el.nativeElement.querySelector(".modal");
    modal.style.display = "none";
    this.closePopup.emit();
  }
}
