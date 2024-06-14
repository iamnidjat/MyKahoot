import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public get facebookUrl(): string {
    return 'https://facebook.com';
  }

  public get linkedinUrl(): string {
    return 'https://linkedin.com';
  }

  public get instagramUrl(): string {
    return 'https://instagram.com';
  }

  public get twitterUrl(): string {
    return 'https://twitter.com';
  }

  public get youtubeUrl(): string {
    return 'https://youtube.com';
  }

  public get cookiesConsentUrl(): string {
    return'https://openli.com/guides/cookie-consent';
  }
}

