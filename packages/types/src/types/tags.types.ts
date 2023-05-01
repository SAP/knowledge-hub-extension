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

export interface SortedAlphaTags {
    [key: string]: Tag[];
}

export interface TagsAlphaRef {
    label: string;
    value: string;
    ref: null | HTMLDivElement;
}

// API

export interface TagsAPI {
    getTags: () => Promise<FetchResponse<TagsSearchResult>>;
}

export interface TagsAPIOptions {
    apiHost?: string;
}
