export interface LanguageSettings {
  code: string;
  name: string;
  direction: 'ltr' | 'rtl'; // directions: ltr -> left to right and vice versa
}

export const englishSettings: LanguageSettings = {
  code: 'en',
  name: 'English',
  direction: 'ltr',
};

export const russianSettings: LanguageSettings = {
  code: 'ru',
  name: 'Русский',
  direction: 'ltr',
};

export const azerbaijaniSettings: LanguageSettings = {
  code: 'az',
  name: 'Azərbaycan',
  direction: 'ltr',
};
