import type { Error, FetchResponse } from './common.types';
import type { Tag } from './tags.types';
import type { BlogFiltersEntryType } from '../const';

export interface Blogs {
    result: BlogsState;
    query: BlogsSearchQuery;
    ui: BlogsUiState;
    tags: Tag[];
}

export interface BlogsState {
    data: BlogsSearchResultContentItem[];
    totalCount: number;
    error: Error;
    pending: boolean;
}

export interface BlogsSearchResult {
    query: BlogsSearchQuery;
    totalCount: number;
    contentItems: BlogsSearchResultContentItem[];
}

export interface BlogsSearchQuery {
    page?: number;
    limit?: number;
    orderBy?: string;
    order?: string;
    contentTypes?: string[];
    managedTags?: string[];
    searchTerm?: string;
    questionType?: string;
    language?: string | null;
    blogCategories?: string[];
    authorId?: string;
    userTags?: string;
    updatedFrom?: Date;
    updatedTo?: Date;
    createdFrom?: Date;
    createdTo?: Date;
    boostingStrategy?: string;
    additionalManagedTags?: string[];
    additionalUserTags?: string[];
}

export interface BlogsUiState {
    isLoading: boolean;
    isFiltersMenuOpened: boolean;
    filtersEntries: BlogFiltersEntry[];
}

export interface BlogsSearchResultContentItem {
    id: string;
    url: string;
    title: string;
    excerpt: string | null;
    author: BlogsAuthor;
    type: string;
    managedTags: Tag[];
    updated: Date;
    created: Date;
    likeCount: number | null;
    voteCount?: number | null;
    commentCount: number | null;
    answerCount?: number | null;
    followersCount?: number | null;
    followingsCount?: number | null;
    description: string;
    language: string;
    extra?: string | null;
}

export interface BlogsAuthor {
    displayName: string;
    username: string;
    active: boolean;
}

// API

export interface BlogsAPI {
    getBlogs: (queryOptions?: BlogsSearchQuery | undefined) => Promise<FetchResponse<BlogsSearchResult>>;
}

export interface BlogsAPIOptions {
    apiHost?: string;
}

// BLOGS FILTERS

export interface BlogFiltersEntry {
    id: string;
    label: string;
    type: BlogFiltersEntryType;
}
