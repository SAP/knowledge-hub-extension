import { stringify } from 'qs';

import type {
    BlogsSearchQuery,
    BlogsSearchResult,
    BlogsAPI,
    BlogsAPIOptions,
    FetchResponse
} from '@sap/knowledge-hub-extension-types';
import { BLOGS_API_HOST, BLOGS_SEARCH_PATH } from '@sap/knowledge-hub-extension-types';
import asyncFetch from '../utils/asyncFetch';

/**
 * Returns API to programmatically access community blogs.
 *
 * @param options - options like API host, node enhancements, or html enhancements
 * @returns - API
 */
export function getCommunityBlogsApi(options?: BlogsAPIOptions): BlogsAPI {
    const apiHost = options?.apiHost ?? BLOGS_API_HOST;

    return {
        getBlogs: async (queryOptions?: BlogsSearchQuery | undefined): Promise<FetchResponse<BlogsSearchResult>> =>
            getBlogs(apiHost, queryOptions)
    };
}

/**
 * Return a stringify version of all api options.
 *
 * @param queryOptions - a query option oobject
 * @returns - a string of url options
 */
export function prepareQueryOptions(queryOptions: BlogsSearchQuery | undefined): string {
    if (queryOptions) {
        if (queryOptions.searchTerm === '') {
            queryOptions.orderBy = 'UPDATE_TIME';
        }

        queryOptions = Object.fromEntries(
            Object.entries(queryOptions).filter(
                ([, value]) => typeof value !== undefined && value !== null && value !== ''
            )
        );
    }

    return stringify(queryOptions);
}

/**
 * Return an object of blogs search result.
 *
 * @param host - Blogs API host
 * @param queryOptions - options like query string, filters
 * @returns - Object of blogs result
 */
export async function getBlogs(
    host: string,
    queryOptions: BlogsSearchQuery | undefined
): Promise<FetchResponse<BlogsSearchResult>> {
    const options = prepareQueryOptions(queryOptions);
    const url = `${host}${BLOGS_SEARCH_PATH}${options}`;

    return await asyncFetch<BlogsSearchResult>(url);
}
