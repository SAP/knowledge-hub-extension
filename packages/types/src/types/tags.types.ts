import type { Error, FetchResponse } from './common.types';

export interface Tags {
    result: TagsState;
}

export interface TagsState {
    data: TagsSearchResult;
    error: Error;
    pending: boolean;
}

export interface Tag {
    guid: string;
    displayName: string;
}

export interface TagsSearchResult {
    filteredTags: Tag[];
}

// API

export interface TagsAPI {
    getTags: () => Promise<FetchResponse<TagsSearchResult>>;
}

export interface TagsAPIOptions {
    apiHost?: string;
}
