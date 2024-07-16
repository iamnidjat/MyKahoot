import { Component } from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-messages-menu-form',
  standalone: true,
  imports: [
    TranslateModule,
    RouterLink
  ],
  templateUrl: './messages-menu-form.component.html',
  styleUrl: './messages-menu-form.component.css'
})
export class MessagesMenuFormComponent {
  constructor(private router: Router) {}

  public onGetMessagesClick(): void {
    this.router.navigate(['/app/get-messages']);
  }

  public onSendMessageClick(): void {
    this.router.navigate(['/app/send-message']);
  }
}
