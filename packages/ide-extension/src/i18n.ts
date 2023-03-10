import i18next from 'i18next';
import * as i18nEn from './i18n/i18n.json';

export async function initI18n(): Promise<void> {
    // Initialize i18next of ide-extension
    await i18next.init({
        resources: {
            en: {
                translation: i18nEn
            }
        },
        lng: 'en',
        fallbackLng: 'en',
        joinArrays: '\n\n',
        returnNull: false
    });
}
