import axios from 'axios';
import type { TutorialsSearchResultData } from '@sap/knowledge-hub-extension-types';
import { getDeveloperTutorialsApi, getTutorials, prepareQueyOptions } from '../../src/api/tutorials-api';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

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

            expect(res).toEqual(result);
        });
    });

    describe('getDeveloperTutorialsApi', () => {
        it('should test `getDeveloperTutorialsApi` function', async () => {
            const options = {
                apiHost: 'https://developers.sap.com'
            };
            const res = getDeveloperTutorialsApi(options);

            expect(res).toBeDefined();
        });
    });

    describe('getTutorials', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should test `getTutorials` function', async () => {
            const options = {
                rows: 12,
                start: 0,
                searchField: '',
                pagePath: '/content/developers/website/languages/en/tutorial-navigator',
                language: 'en_us',
                addDefaultLanguage: true,
                filters: []
            };

            const data: TutorialsSearchResultData = {
                group: '/group',
                mission: '/mission',
                facets: {
                    Experience: ['2'],
                    'Software Product': ['3'],
                    Topic: ['4'],
                    Type: ['5']
                },
                iconPath: {},
                tags: {
                    '1': {
                        title: 'tag_title',
                        tagTitle: 'tag_title',
                        tagAlternativeTitles: ['tag_title_1']
                    },
                    '2': {
                        title: 'tag_experience',
                        tagTitle: 'tag_tag_experience',
                        tagAlternativeTitles: ['tag_tag_experience_1']
                    }
                },
                tutorialsNewFrom: new Date('Sat, 31 Dec 2022 10:32 AM'),
                result: [
                    {
                        creationDate: new Date('Oct 6, 2021 4:20:00 AM'),
                        description: '',
                        experience: '2',
                        featured: true,
                        featuredOrder: 1000,
                        icon: '/content/dam/site/developer/tutorial-badges/tutorial-newbie.svg',
                        imsId: 99,
                        isRequiredLicense: false,
                        itemsType: 'tutorials',
                        primaryTag: '1',
                        publicUrl: '/mission.tutorials-are-fun.html',
                        statusTask: 'intact',
                        taskProgress: 0,
                        taskType: '2',
                        tasksCount: 1,
                        time: '600',
                        title: 'Tutorials are fun'
                    }
                ],
                numFound: 1,
                countGroups: 10,
                countMissions: 20,
                countTutorials: 30
            };

            let requestUrl = '';
            mockedAxios.get.mockImplementation((url) => {
                requestUrl = url;
                return Promise.resolve({ data });
            });

            const host = 'https://developers.sap.com';
            const result = await getTutorials(host, options);

            expect(requestUrl).toBe(
                'https://developers.sap.com/bin/sapdx/v3/solr/search?json={"rows":12,"start":0,"searchField":"","pagePath":"/content/developers/website/languages/en/tutorial-navigator","language":"en_us","addDefaultLanguage":true,"filters":[]}'
            );

            expect(result).toEqual({
                data: data,
                error: undefined,
                status: 'fetched'
            });
        });
    });
});
