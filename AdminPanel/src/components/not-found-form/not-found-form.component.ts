import { Component } from '@angular/core';
import { Location } from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";
import {NavbarFormComponent} from "../navbar-form/navbar-form.component";
import {ThemeToggleComponent} from "../theme-toggle/theme-toggle.component";
import {FooterFormComponent} from "../footer-form/footer-form.component";
import {ScrollToTopFormComponent} from "../scroll-to-top-form/scroll-to-top-form.component";

@Component({
  standalone: true,
  selector: 'app-not-found-form',
  templateUrl: './not-found-form.component.html',
  imports: [
    TranslateModule,
    NavbarFormComponent,
    ThemeToggleComponent,
    FooterFormComponent,
    ScrollToTopFormComponent
  ],
  styleUrls: ['./not-found-form.component.css']
})
export class NotFoundFormComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
