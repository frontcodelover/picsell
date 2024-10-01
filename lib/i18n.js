import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'fr',
    ns: ['common'],                 // Spécifie le namespace à utiliser
    defaultNS: 'common',             // Définit le namespace par défaut
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',  // Chemin pour charger les fichiers de traduction
    },
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export default i18n;
