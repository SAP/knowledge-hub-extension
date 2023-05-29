import type {
    TutorialsSearchQuery,
    TutorialsSearchResult,
    TutorialsAPI,
    TutorialsAPIOptions,
    FetchResponse
} from '@sap/knowledge-hub-extension-types';
import { TUTORIALS_API_HOST, TUTORIALS_SEARCH_PATH, TUTORIALS_SOLR_TAG_ID } from '@sap/knowledge-hub-extension-types';
import asyncFetch from '../utils/asyncFetch';

/**
 * Return a stringify version of all api options.
 *
 * @param queryOptions  A query options object
 * @returns - a string of url options
 */
export function prepareQueyOptions(queryOptions: TutorialsSearchQuery | undefined): string {
    return JSON.stringify(queryOptions);
}

/**
 * Return a formatted filter tagId option entry.
 *
 * @param {string} tagId A tag Id
 * @returns - a string of filters tagId options
 */
function formatFiltersTagIdOptions(tagId: string): string {
    return `/${tagId}/${TUTORIALS_SOLR_TAG_ID}`;
}

/**
 * Return API to programmatically access the developer tutorials.
 *
 * @param options - options like API host, node enhancements, or html enhancements
 * @returns - API
 */
export function getDeveloperTutorialsApi(options?: TutorialsAPIOptions): TutorialsAPI {
    const apiHost = options?.apiHost ?? TUTORIALS_API_HOST;

    return {
        getTutorials: async (
            queryOptions?: TutorialsSearchQuery | undefined
        ): Promise<FetchResponse<TutorialsSearchResult>> => getTutorials(apiHost, queryOptions)
    };
}

/**
 * Returns an object of tutorials search result.
 *
 * @param host - Developer tutorials API host
 * @param queryOptions - options like query string, filters
 * @returns - Object of tutorial entries
 */
export async function getTutorials(
    host: string,
    queryOptions: TutorialsSearchQuery | undefined
): Promise<FetchResponse<TutorialsSearchResult>> {
    if (queryOptions && queryOptions.filters) {
        queryOptions.filters.forEach((item: string, index: number, array: string[]) => {
            array[index] = formatFiltersTagIdOptions(item.replace(':', '/'));
        });
    }

    const options = prepareQueyOptions(queryOptions);
    const url = `${host}${TUTORIALS_SEARCH_PATH}${options}`;

    return await asyncFetch<TutorialsSearchResult>(url);
}
