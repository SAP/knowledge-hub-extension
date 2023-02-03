import { initI18n } from '../src/webview/i18n';

describe('i18n', () => {
    it('it initializes i18n', () => {
        expect(initI18n).not.toThrow();
    });
});
