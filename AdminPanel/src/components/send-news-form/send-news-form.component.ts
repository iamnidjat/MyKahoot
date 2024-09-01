import {Component, ElementRef, ViewChild} from '@angular/core';
import Swal from "sweetalert2";
import {TranslateModule} from "@ngx-translate/core";
import {NavbarFormComponent} from "../navbar-form/navbar-form.component";
import {ThemeToggleComponent} from "../theme-toggle/theme-toggle.component";
import {FooterFormComponent} from "../footer-form/footer-form.component";
import {ScrollToTopFormComponent} from "../scroll-to-top-form/scroll-to-top-form.component";
import {Location} from "@angular/common";

const API_URL: string = "https://localhost:7176/api/v1/NewsLetter/";

@Component({
  selector: 'app-send-news-form',
  standalone: true,
  imports: [
    TranslateModule,
    NavbarFormComponent,
    ThemeToggleComponent,
    FooterFormComponent,
    ScrollToTopFormComponent
  ],
  templateUrl: './send-news-form.component.html',
  styleUrl: './send-news-form.component.css'
})
export class SendNewsFormComponent {

  @ViewChild("News") news!: ElementRef;

  constructor(private location: Location) {}

  public async sendNewsAsync(news: string) : Promise<void> {
    if (news !== "") {
      await fetch(API_URL + `SendingNews?news=${news}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => {
        if (response.status === 200)
        {
          Swal.fire("News were sent successfully!");
          this.news.nativeElement.value = "";
        }
      });
    }
    else {
      Swal.fire("Warning", "Fill news form!", "warning");
    }
  }

  public backOptions(): void {
    this.location.back();
  }
}
