import axios from 'axios';
import type { TagsSearchResult } from '@sap/knowledge-hub-extension-types';
import { getCommunityTagsApi, getTags } from '../../src/api/tags-api';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('tags-api', () => {
    describe('getCommunityTagsApi', () => {
        it('should test `getCommunityTagsApi` function', async () => {
            const options = {
                apiHost: 'https://searchproxy.api.community.sap.com'
            };
            const res = getCommunityTagsApi(options);

            await expect(res).toBeDefined();
        });
    });

    describe('getTags', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should test `getTags` function', async () => {
            const data: TagsSearchResult = {
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
            const result = await getTags(host);

            expect(requestUrl).toBe('https://searchproxy.api.community.sap.com/api/v1/tags');

            await expect(result).toEqual({
                data: data,
                error: undefined,
                status: 'fetched'
            });
        });
    });
});
