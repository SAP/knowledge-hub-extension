import type {
    BlogsTagsSearchResult,
    TutorialsSearchResultData,
    TutorialsSearchQuery,
    TagsAPI,
    FetchResponse
} from '@sap/knowledge-hub-extension-types';
import {
    TAGS_BLOGS_API_HOST,
    TAGS_BLOGS_TAGS_PATH,
    TAGS_TUTORIALS_API_HOST,
    TAGS_TUTORIALS_SEARCH_PATH
} from '@sap/knowledge-hub-extension-types';

import asyncFetch from '../utils/asyncFetch';

/**
 * Returns API to programmatically access community tags.
 *
 * @returns - API
 */
export function getCommunityTagsApi(): TagsAPI {
    const apiHostBlogs = TAGS_BLOGS_API_HOST;
    const apiHostTutorials = TAGS_TUTORIALS_API_HOST;

    return {
        getBlogsTags: async (): Promise<FetchResponse<BlogsTagsSearchResult>> => getBlogsTags(apiHostBlogs),
        getTutorialsTags: async (): Promise<FetchResponse<TutorialsSearchResultData>> =>
            getTutorialsTags(apiHostTutorials)
    };
}

/**
 * Return an object of tags result.
 *
 * @param host - Tags API host
 * @returns - Object of blogs result
 */
export async function getBlogsTags(host: string): Promise<FetchResponse<BlogsTagsSearchResult>> {
    const url = `${host}${TAGS_BLOGS_TAGS_PATH}`;

    return await asyncFetch<BlogsTagsSearchResult>(url);
}

/**
 * Returns an object of tutorials search result.
 *
 * @param host - Developer tutorials API host
 * @returns - Object of tutorial entries
 */
export async function getTutorialsTags(host: string): Promise<FetchResponse<TutorialsSearchResultData>> {
    const queryOptions: TutorialsSearchQuery = {
        rows: 10,
        start: 0,
        searchField: '',
        pagePath: '/content/developers/website/languages/en/tutorial-navigator',
        language: 'en_us',
        addDefaultLanguage: true,
        filters: []
    };
    const options = JSON.stringify(queryOptions);
    const url = `${host}${TAGS_TUTORIALS_SEARCH_PATH}${options}`;

    return await asyncFetch<TutorialsSearchResultData>(url);
}
