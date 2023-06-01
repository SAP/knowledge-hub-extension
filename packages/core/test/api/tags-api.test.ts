import axios from 'axios';
import type { BlogsTagsSearchResult, TutorialsSearchResult } from '@sap/knowledge-hub-extension-types';
import { getCommunityTagsApi, getBlogsTags, getTutorialsTags } from '../../src/api/tags-api';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('tags-api', () => {
    describe('getCommunityTagsApi', () => {
        it('should test `getCommunityTagsApi` function', () => {
            const res = getCommunityTagsApi();
            expect(res).toBeDefined();
        });
    });

    describe('test `getBlogsTags`', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should test `getBlogsTags` function', async () => {
            const data: BlogsTagsSearchResult = {
                filteredTags: [
                    {
                        displayName: 'Tag 1',
                        guid: 'tag1'
                    },
                    {
                        displayName: 'Tag 2',
                        guid: 'tag2'
                    },
                    {
                        displayName: 'Tag 3',
                        guid: 'tag3'
                    },
                    {
                        displayName: 'Tag 4',
                        guid: 'tag4'
                    },
                    {
                        displayName: 'Tag 5',
                        guid: 'tag5'
                    }
                ]
            };

            let requestUrl = '';
            mockedAxios.get.mockImplementation((url) => {
                requestUrl = url;
                return Promise.resolve({ data });
            });

            const host = 'https://searchproxy.api.community.sap.com';
            const result = await getBlogsTags(host);

            expect(requestUrl).toBe('https://searchproxy.api.community.sap.com/api/v1/tags');

            expect(result).toEqual({
                data: data,
                error: undefined,
                status: 'fetched'
            });
        });

        it('should test `getBlogsTags` function with error', async () => {
            const error = {
                message: 'error message'
            };

            mockedAxios.get.mockImplementation(() => {
                return Promise.reject(error);
            });

            const host = 'https://searchproxy.api.community.sap.com';
            const result = await getBlogsTags(host);

            expect(result).toEqual({
                data: undefined,
                error: 'error message',
                status: 'error'
            });
        });

        it('should test `getBlogsTags` function with empty host', async () => {
            const result = await getBlogsTags('');

            expect(result).toEqual({
                data: undefined,
                error: 'error message',
                status: 'error'
            });
        });
    });

    describe('test `getTutorialsTags`', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should test `getTutorialsTags` function', async () => {
            const data: TutorialsSearchResult = {
                countGroups: 1,
                countMissions: 1,
                countTutorials: 1,
                facets: {
                    topic: ['test']
                },
                group: '/group',
                iconPath: {},
                mission: '/mission',
                numFound: 3,
                result: [],
                tags: {
                    '1': {
                        title: 'tag 1',
                        tagTitle: 'tag 1',
                        tagAlternativeTitles: ['tag1']
                    },
                    '2': {
                        title: 'tag 2',
                        tagTitle: 'tag 2',
                        tagAlternativeTitles: ['tag2']
                    },
                    '3': {
                        title: 'tag 3',
                        tagTitle: 'tag 3',
                        tagAlternativeTitles: ['tag3']
                    }
                },
                tutorialsNewFrom: new Date()
            };

            let requestUrl = '';
            mockedAxios.get.mockImplementation((url) => {
                requestUrl = url;
                return Promise.resolve({ data });
            });

            const host = 'https://developers.sap.com';
            const result = await getTutorialsTags(host);

            expect(requestUrl).toBe(
                'https://developers.sap.com/bin/sapdx/v3/solr/search?json={"rows":10,"start":0,"searchField":"","pagePath":"/content/developers/website/languages/en/tutorial-navigator","language":"en_us","addDefaultLanguage":true,"filters":[]}'
            );

            expect(result).toEqual({
                data: data,
                error: undefined,
                status: 'fetched'
            });
        });

        it('should test `getTutorialsTags` function with error', async () => {
            const error = {
                message: 'error message'
            };

            mockedAxios.get.mockImplementation(() => {
                return Promise.reject(error);
            });

            const host = 'https://developers.sap.com';
            const result = await getTutorialsTags(host);

            expect(result).toEqual({
                data: undefined,
                error: 'error message',
                status: 'error'
            });
        });

        it('should test `getTutorialsTags` function with empty host', async () => {
            const result = await getTutorialsTags('');

            expect(result).toEqual({
                data: undefined,
                error: 'error message',
                status: 'error'
            });
        });
    });
});
