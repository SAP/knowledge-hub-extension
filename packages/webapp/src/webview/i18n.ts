import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as i18nEn from './i18n/i18n.json';

export function initI18n(): void {
    i18n.use(initReactI18next)
        .init({
            resources: {
                en: {
                    translation: i18nEn
                }
            },
            lng: 'en',
            fallbackLng: 'en',
            interpolation: {
                escapeValue: false
            }
        })
        .catch(() => {
            // Ignore any errors since the default texts will still work
        });
}
