export const BLOGS_LIMIT_PER_PAGE = 10;
export const TUTORIALS_LIMIT_PER_PAGE = 12;

export enum PathType {
    HOME = 'home',
    TUTORIALS = 'tutorials',
    BLOGS = 'blogs',
    VIDEO = 'video'
}

export enum TUTORIALS_FILTERS_LABELS {
    Topic = 'Topic',
    'Software Product' = 'Software Product',
    Experience = 'Experience',
    Type = 'Type',
    Options = 'Options'
}

export enum BlogFiltersEntryType {
    TAG = 'TAG',
    LANGUAGE = 'LANGUAGE',
    CATEGORY = 'CATEGORY'
}

export enum BlogSearchSortBy {
    UPDATE_TIME = 'UPDATE_TIME',
    RELEVANCE = 'RELEVANCE'
}
