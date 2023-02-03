import { prepareQueryOptions, getCommunityBlogsApi, getBlogs } from '../../src/api/blogs-api';

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
                blogCategories: '',
                authorId: '',
                userTags: '',
                boostingStrategy: '',
                additionalManagedTags: [],
                additionalUserTags: []
            };
            const result = 'page=0&limit=3&orderBy=CREATE_TIME&order=DESC&contentTypes%5B0%5D=blogpost';
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
                blogCategories: '',
                authorId: '',
                userTags: '',
                boostingStrategy: '',
                additionalManagedTags: [],
                additionalUserTags: []
            };
            const result = 'page=0&limit=3&orderBy=RELEVANCE&order=DESC&contentTypes%5B0%5D=blogpost&searchTerm=test';
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
        it('should test `getBlogs` function', async () => {
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
                blogCategories: '',
                authorId: '',
                userTags: '',
                boostingStrategy: '',
                additionalManagedTags: [],
                additionalUserTags: []
            };
            const host = 'https://searchproxy.api.community.sap.com';
            const result = await getBlogs(host, options);

            await expect(result).toBeDefined();
        });
    });
});
