import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-footer-form',
  templateUrl: './footer-form.component.html',
  styleUrls: ['./footer-form.component.css']
})
export class FooterFormComponent {
  constructor() {
  }

  ToFacebook(): void{
    window.open('https://facebook.com', "_blank");
  }

  ToYoutube(): void{
    window.open('https://youtube.com', "_blank");
  }

  ToInstagram(): void{
    window.open('https://instagram.com', "_blank");
  }

  ToTwitter(): void{
    window.open('https://twitter.com', "_blank");
  }
}
