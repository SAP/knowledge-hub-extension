import { getHtml } from '../../../src/utils/web';

describe('Test for HTML generation', () => {
    test('Generate HTML', () => {
        expect(getHtml('ROOT', 'TITLE', 'BUNDLE_URI', 'VENDOR_URI', 'VENDOR_CSS_URI')).toMatchSnapshot();
    });
});
