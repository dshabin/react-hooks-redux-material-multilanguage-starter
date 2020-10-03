import { initReactI18next } from 'react-i18next';
import i18n from "i18next";
import translationFa from './translations/fa.json';

export default i18n.use(initReactI18next)
    .init({
        resources: {
            fa: { translation: translationFa }
        },
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });