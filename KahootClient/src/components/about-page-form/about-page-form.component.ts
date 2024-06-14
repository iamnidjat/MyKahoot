import { Component } from '@angular/core';
import {ConfigService} from "../../services/config.service";

@Component({
  selector: 'app-about-page-form',
  templateUrl: './about-page-form.component.html',
  styleUrls: ['./about-page-form.component.css']
})
export class AboutPageFormComponent {
  constructor(private configService: ConfigService) {}

  public onFacebookClick(): void {
    window.open(this.configService.facebookUrl, '_blank');
  }

  public onLinkedinClick(): void {
    window.open(this.configService.linkedinUrl, '_blank');
  }

  public onInstagramClick(): void {
    window.open(this.configService.instagramUrl, '_blank');
  }

  public onTwitterClick(): void {
    window.open(this.configService.twitterUrl, '_blank');
  }
}
