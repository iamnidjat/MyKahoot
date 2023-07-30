import { Component } from '@angular/core';

@Component({
  selector: 'app-about-page-form',
  templateUrl: './about-page-form.component.html',
  styleUrls: ['./about-page-form.component.css']
})
export class AboutPageFormComponent {

  constructor() {
  }

  ToFacebook(): void{
    window.open('https://facebook.com', "_blank");
  }

  ToLinkedin(): void{
    window.open('https://linkedin.com', "_blank");
  }

  ToInstagram(): void{
    window.open('https://instagram.com', "_blank");
  }

  ToTwitter(): void{
    window.open('https://twitter.com', "_blank");
  }
}
