import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {azerbaijaniSettings, englishSettings, LanguageSettings, russianSettings} from "../assets/language-settings";

@Injectable({
  providedIn: 'root'
})
export class SwitchLanguageService {
  constructor(private translate: TranslateService) {
    // Set the default language to English when the component is instantiated
    translate.setDefaultLang(englishSettings.code);

    // Retrieve the stored language preference from local storage
    const storedLang: string | null = localStorage.getItem("lang");

    if (storedLang) {
      // Try to get language settings for the stored language
      const selectedLanguage: LanguageSettings | undefined = this.getLanguageSettings(storedLang);

      if (selectedLanguage) {
        // If language settings are found, switch to the stored language
        translate.use(selectedLanguage.code);
      } else {
        // If stored language is not supported, fallback to default language (English)
        translate.use(englishSettings.code);
      }
    } else {
      // If no stored language preference, use default language (English)
      translate.use(englishSettings.code);
    }
  }

  // Method to switch the application language
  public switchLang(lang: string): void {
    // Try to get language settings for the selected language
    const selectedLanguage: LanguageSettings | undefined = this.getLanguageSettings(lang);

    if (selectedLanguage) {
      // If language settings are found, switch to the selected language
      this.translate.use(selectedLanguage.code);
      localStorage.setItem("lang", selectedLanguage.code);
    } else {
      // Notify the user or log a warning and fallback to default language (English)
      console.warn(`Language '${lang}' is not supported. Falling back to default language.`);
      this.translate.use(englishSettings.code);
      localStorage.setItem("lang", englishSettings.code);
    }
  }

  // Private method to retrieve language settings based on language code
  private getLanguageSettings(langCode: string): LanguageSettings | undefined {
    // Switch statement to map language codes to corresponding language settings
    switch (langCode) {
      case 'en':
        return englishSettings;
      case 'ru':
        return russianSettings;
      case 'az':
        return azerbaijaniSettings;
      default:
        return undefined; // Return undefined if language settings are not found
    }
  }
}
