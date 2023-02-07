import { getDeveloperTutorialsApi, getTutorials, prepareQueyOptions } from '../../src/api/tutorials-api';

describe('tutorials-api', () => {
    describe('prepareQueryOptions', () => {
        it('should test `prepareQueryOptions` function', async () => {
            const options = {
                rows: 3,
                start: 0,
                searchField: '',
                pagePath: '/content/developers/website/languages/en/tutorial-navigator',
                language: 'en_us',
                addDefaultLanguage: true,
                filters: []
            };

            const result =
                '{"rows":3,"start":0,"searchField":"","pagePath":"/content/developers/website/languages/en/tutorial-navigator","language":"en_us","addDefaultLanguage":true,"filters":[]}';
            const res = prepareQueyOptions(options);

            await expect(res).toEqual(result);
        });
    });

    describe('getDeveloperTutorialsApi', () => {
        it('should test `getDeveloperTutorialsApi` function', async () => {
            const options = {
                apiHost: 'https://developers.sap.com'
            };
            const res = getDeveloperTutorialsApi(options);

            await expect(res).toBeDefined();
        });
    });

    describe('getTutorials', () => {
        it('should test `getTutorials` function', async () => {
            const options = {
                rows: 3,
                start: 0,
                searchField: '',
                pagePath: '/content/developers/website/languages/en/tutorial-navigator',
                language: 'en_us',
                addDefaultLanguage: true,
                filters: []
            };

            const host = 'https://developers.sap.com';
            const result = await getTutorials(host, options);

            await expect(result).toBeDefined();
        });
    });
});
