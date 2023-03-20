import type { TagsSearchResult, TagsAPI, TagsAPIOptions, FetchResponse } from '@sap/knowledge-hub-extension-types';

import asyncFetch from '../utils/asyncFetch';

const API_HOST = 'https://searchproxy.api.community.sap.com';
const VERSION = 'v1';
const TAGS_PATH = `/api/${VERSION}/tags`;

/**
 * Returns API to programmatically access community tags.
 *
 * @param options - options like API host, node enhancements, or html enhancements
 * @returns - API
 */
export function getCommunityTagsApi(options?: TagsAPIOptions): TagsAPI {
    const apiHost = options?.apiHost || API_HOST;

    return {
        getTags: async (): Promise<FetchResponse<TagsSearchResult>> => getTags(apiHost)
    };
}

/**
 * Return an object of tags result.
 *
 * @param host - Tags API host
 * @returns - Object of blogs result
 */
export async function getTags(host: string): Promise<FetchResponse<TagsSearchResult>> {
    const url = `${host}${TAGS_PATH}`;

    return await asyncFetch<TagsSearchResult>(url);
}
