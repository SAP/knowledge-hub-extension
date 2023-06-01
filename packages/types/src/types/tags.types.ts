import type { Error, FetchResponse } from './common.types';
import type { TutorialsTags, TutorialsSearchResult } from './tutorials.types';

export interface Tags {
    blogs: BlogsTagsState;
    tutorials: TutorialsTagsState;
}

export interface BlogsTagsState {
    data: BlogsTagsSearchResult;
    error: Error;
    pending: boolean;
}

export interface TutorialsTagsState {
    tags: TutorialsTags;
    error: Error;
    pending: boolean;
}

export interface Tag {
    guid: string;
    displayName: string;
}

export interface BlogsTagsSearchResult {
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
    getBlogsTags: () => Promise<FetchResponse<BlogsTagsSearchResult>>;
    getTutorialsTags: () => Promise<FetchResponse<TutorialsSearchResult>>;
}
