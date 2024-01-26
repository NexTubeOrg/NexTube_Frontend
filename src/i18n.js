import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './localization/en.json';
import ukTranslation from './localization/uk.json';
import deTranslation from './localization/de.json';
import esTranslation from './localization/es.json';

import 'dayjs/locale/de';
import 'dayjs/locale/en';
import 'dayjs/locale/uk';
import 'dayjs/locale/es';

import dayjs from 'dayjs';
const resources = {
  en: { translation: enTranslation },
  uk: { translation: ukTranslation },
  de: { translation: deTranslation },
  es: { translation: esTranslation },
};

const defLang = ()=>{
if(window.localStorage.defaultLanguage== undefined)
return 'en';
else {
  dayjs.locale(window.localStorage.defaultLanguage);
  return window.localStorage.defaultLanguage;
}
}


i18n
  .use(initReactI18next)
  .init({
    lng: defLang(),
    fallbackLng: "en",
    resources,
    interpolation: {
      escapeValue: false // не потрібно екранувати значення
    }
  });

export default i18n;
