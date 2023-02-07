import type { Error, FetchResponse } from './common.types';

export interface BlogsManagedTag {
    guid: string;
    displayName: string;
}

export interface Blogs {
    result: BlogsState;
    ui: BlogsSearchQuery;
    tags: BlogsManagedTag[];
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
    language?: string;
    blogCategories?: string;
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

export interface BlogsSearchResultContentItem {
    id: string;
    url: string;
    title: string;
    excerpt: string;
    author: BlogsAuthor;
    type: string;
    managedTags: BlogsManagedTag[];
    updated: Date;
    created: Date;
    likeCount: number;
    voteCount?: number;
    commentCount: number;
    answerCount?: number;
    followersCount?: number;
    followingsCount?: number;
    description: string;
    language: string;
    extra?: string;
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
