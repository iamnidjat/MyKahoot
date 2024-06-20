import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ConfigService} from "../../services/config.service";

@Component({
  selector: 'app-footer-form',
  standalone: true,
  imports: [],
  templateUrl: './footer-form.component.html',
  styleUrls: ['./footer-form.component.css']
})
export class FooterFormComponent {
  constructor(private configService: ConfigService) {}

  public onFacebookClick(): void {
    window.open(this.configService.facebookUrl, '_blank');
  }

  public onYoutubeClick(): void {
    window.open(this.configService.youtubeUrl, '_blank');
  }

  public onInstagramClick(): void {
    window.open(this.configService.instagramUrl, '_blank');
  }

  public onTwitterClick(): void {
    window.open(this.configService.twitterUrl, '_blank');
  }
}
