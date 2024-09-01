import { Component } from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {Router, RouterLink} from "@angular/router";
import {FooterFormComponent} from "../footer-form/footer-form.component";
import {ScrollToTopFormComponent} from "../scroll-to-top-form/scroll-to-top-form.component";
import {NavbarFormComponent} from "../navbar-form/navbar-form.component";
import {ThemeToggleComponent} from "../theme-toggle/theme-toggle.component";

@Component({
  selector: 'app-messages-menu-form',
  standalone: true,
  imports: [
    TranslateModule,
    RouterLink,
    FooterFormComponent,
    ScrollToTopFormComponent,
    NavbarFormComponent,
    ThemeToggleComponent
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
