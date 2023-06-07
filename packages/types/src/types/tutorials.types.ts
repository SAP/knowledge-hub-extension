import type { Error, FetchResponse } from './common.types';

export interface Tutorials {
    result: TutorialsState;
    query: TutorialsSearchQuery;
    ui: TutorialsUiState;
}

export interface TutorialsState {
    result: TutorialsSearchResult;
    error: Error;
    pending: boolean;
}

export interface TutorialsSearchResult {
    data: TutorialsSearchResultData;
    query: TutorialsSearchQuery;
}

export interface TutorialsSearchQuery {
    rows: number;
    start: number;
    searchField: string;
    pagePath: string;
    language: string;
    addDefaultLanguage: boolean;
    filters: string[];
}

export interface TutorialsUiState {
    isLoading: boolean;
    isFiltersMenuOpened: boolean;
}

export interface TutorialsSearchResultData {
    group: string;
    mission: string;
    facets: TutorialsFacets;
    iconPath: TutorialsIconPath;
    tags: TutorialsTags;
    tutorialsNewFrom: Date;
    result: TutorialsEntry[] | [];
    numFound: number;
    countGroups: number;
    countMissions: number;
    countTutorials: number;
}

export interface TutorialsEntry {
    creationDate: Date;
    description: string;
    experience: string;
    featured: boolean;
    featuredOrder: number;
    icon: string;
    imsId: number;
    isRequiredLicense: boolean;
    itemsType?: string;
    primaryTag: string;
    publicUrl: string;
    statusTask: string;
    taskProgress: number;
    taskType: string;
    tasksCount: number;
    time: string;
    title: string;
}

export interface TutorialsTags {
    [index: string]: TutorialsTag;
}

export interface TutorialsTag {
    tagAlternativeTitles: string[];
    tagTitle: string;
    title: string;
}

export interface TutorialsIconPath {
    [index: string]: string[];
}

export interface TutorialsFacets {
    [index: string]: string[];
}

export interface TutorialsTagWithTitle {
    tag: string;
    title: string;
}

// API

export interface TutorialsAPI {
    getTutorials: (queryOptions?: TutorialsSearchQuery | undefined) => Promise<FetchResponse<TutorialsSearchResult>>;
}

export interface TutorialsAPIOptions {
    apiHost?: string;
}
