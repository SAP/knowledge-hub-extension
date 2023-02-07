import type { Error, FetchResponse } from './common.types';

export interface Tutorials {
    result: TutorialsState;
    ui: TutorialsSearchQuery;
}

export interface TutorialsState {
    data: TutorialsSearchResult;
    error: Error;
    pending: boolean;
}
export interface TutorialsSearchQuery {
    rows?: number;
    start?: number;
    searchField?: string;
    pagePath?: string;
    language?: string;
    addDefaultLanguage?: boolean;
    filters?: string[];
}

export interface TutorialsSearchResult {
    group: string;
    mission: string;
    facets: TutorialsFacets;
    iconPath: TutorialsIconPath;
    tags: TutorialsTags;
    tutorialsNewFrom: string;
    result: TutorialsEntry[] | [];
    numFound: number;
    countGroups: number;
    countMissions: number;
    countTutorials: number;
}

export interface TutorialsEntry {
    creationDate: string;
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

// API

export interface TutorialsAPI {
    getTutorials: (queryOptions?: TutorialsSearchQuery | undefined) => Promise<FetchResponse<TutorialsSearchResult>>;
}

export interface TutorialsAPIOptions {
    apiHost?: string;
}
