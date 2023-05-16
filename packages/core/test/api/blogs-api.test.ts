import axios from 'axios';
import type { BlogsSearchResult } from '@sap/knowledge-hub-extension-types';
import { prepareQueryOptions, getCommunityBlogsApi, getBlogs } from '../../src/api/blogs-api';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('blog-api', () => {
    describe('prepareQueryOptions', () => {
        it('should test with empty `searchTerm` function', async () => {
            const options = {
                page: 0,
                limit: 3,
                orderBy: 'UPDATE_TIME',
                order: 'DESC',
                contentTypes: ['blogpost'],
                managedTags: [],
                searchTerm: '',
                questionType: '',
                language: '',
                blogCategories: [],
                authorId: '',
                userTags: '',
                boostingStrategy: '',
                additionalManagedTags: [],
                additionalUserTags: []
            };
            const result = 'page=0&limit=3&orderBy=UPDATE_TIME&order=DESC&contentTypes%5B0%5D=blogpost';
            const res = prepareQueryOptions(options);

            await expect(res).toEqual(result);
        });
        it('should test with `searchTerm` function', async () => {
            const options = {
                page: 0,
                limit: 3,
                orderBy: 'UPDATE_TIME',
                order: 'DESC',
                contentTypes: ['blogpost'],
                managedTags: [],
                searchTerm: 'test',
                questionType: '',
                language: '',
                blogCategories: [],
                authorId: '',
                userTags: '',
                boostingStrategy: '',
                additionalManagedTags: [],
                additionalUserTags: []
            };
            const result = 'page=0&limit=3&orderBy=UPDATE_TIME&order=DESC&contentTypes%5B0%5D=blogpost&searchTerm=test';
            const res = prepareQueryOptions(options);

            await expect(res).toEqual(result);
        });
    });

    describe('getCommunityBlogsApi', () => {
        it('should test `getCommunityBlogsApi` function', async () => {
            const options = {
                apiHost: 'https://searchproxy.api.community.sap.com'
            };
            const res = getCommunityBlogsApi(options);

            await expect(res).toBeDefined();
        });
    });

    describe('getBlogs', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        test('should test `getBlogs` function', async () => {
            const options = {
                page: 0,
                limit: 3,
                orderBy: 'UPDATE_TIME',
                order: 'DESC',
                contentTypes: ['blogpost'],
                managedTags: [],
                searchTerm: '',
                questionType: '',
                language: '',
                blogCategories: [],
                authorId: '',
                userTags: '',
                boostingStrategy: '',
                additionalManagedTags: [],
                additionalUserTags: []
            };

            const data: BlogsSearchResult = {
                query: options,
                totalCount: 1,
                contentItems: [
                    {
                        id: '1',
                        url: 'url_path',
                        title: 'Test title',
                        excerpt: null,
                        author: {
                            displayName: 'Test author name',
                            username: 'Test author username',
                            active: true
                        },
                        type: 'blogpost',
                        managedTags: [],
                        updated: new Date('2023-03-01T08:35:45'),
                        created: new Date('2023-03-01T08:35:45'),
                        likeCount: null,
                        voteCount: null,
                        commentCount: null,
                        answerCount: null,
                        followersCount: null,
                        followingsCount: null,
                        description: 'Test description',
                        language: 'English',
                        extra: null
                    }
                ]
            };

            let requestUrl = '';
            mockedAxios.get.mockImplementation((url) => {
                requestUrl = url;
                return Promise.resolve({ data });
            });

            const host = 'https://searchproxy.api.community.sap.com';
            const result = await getBlogs(host, options);

            expect(requestUrl).toBe(
                'https://searchproxy.api.community.sap.com/external/api/v1/search?page=0&limit=3&orderBy=UPDATE_TIME&order=DESC&contentTypes%5B0%5D=blogpost'
            );

            await expect(result).toEqual({
                data: data,
                error: undefined,
                status: 'fetched'
            });
        });
    });
});
