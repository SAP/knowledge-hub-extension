export type LanguageId = 'en' | 'de' | 'pt' | 'es' | 'ja' | 'zh';

export type Language = {
    key: LanguageId;
    text: string;
};

const buildLanguage = (key: LanguageId, text: string): Language => ({
    key,
    text
});

export const allLanguages: {
    [K in LanguageId]: Language;
} = {
    en: buildLanguage('en', 'English'),
    de: buildLanguage('de', 'German'),
    pt: buildLanguage('pt', 'Portuguese'),
    es: buildLanguage('es', 'Spanish'),
    ja: buildLanguage('ja', 'Japanese'),
    zh: buildLanguage('zh', 'Chinese (simplified)')
};

export const supportedLanguages = [
    allLanguages.en,
    allLanguages.zh,
    allLanguages.de,
    allLanguages.ja,
    allLanguages.pt,
    allLanguages.es
];
