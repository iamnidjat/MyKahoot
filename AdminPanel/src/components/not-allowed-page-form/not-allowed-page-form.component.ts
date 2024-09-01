import { Component } from '@angular/core';
import {NavbarFormComponent} from "../navbar-form/navbar-form.component";
import {TranslateModule} from "@ngx-translate/core";
import {ScrollToTopFormComponent} from "../scroll-to-top-form/scroll-to-top-form.component";
import {FooterFormComponent} from "../footer-form/footer-form.component";
import {Location} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-not-allowed-page-form',
  templateUrl: './not-allowed-page-form.component.html',
  imports: [
    NavbarFormComponent,
    TranslateModule,
    ScrollToTopFormComponent,
    FooterFormComponent
  ],
  styleUrls: ['./not-allowed-page-form.component.css']
})
export class NotAllowedPageFormComponent {
  constructor(private location: Location) {}

  public goBack(): void {
    this.location.back();
  }
}
