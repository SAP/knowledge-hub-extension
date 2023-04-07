import type { BlogFiltersEntry } from './blogs.types';
import type { TutorialsTagWithTitle } from './tutorials.types';

export const SET_GLOBAL_SETTINGS = 'SET_GLOBAL_SETTINGS';
export const UPDATE_GLOBAL_SETTING = 'UPDATE_GLOBAL_SETTING';

export const FILTERS_BLOGS_TAGS = 'blogs';
export const FILTERS_TUTORIALS_TAGS = 'tutorials';

export const enum Feature {
    NATIVE_PROPERTIES = 'NATIVE_PROPERTIES',
    SHOW_PROPERTIES_DESCRIPTIONS = 'SHOW_PROPERTIES_DESCRIPTIONS',
    FPM_FEATURES = 'FPM_FEATURES',
    ZERO_STATE_FEATURE = 'ZERO_STATE_FEATURE',
    BUILDING_BLOCK_EDITOR = 'BUILDING_BLOCK_EDITOR',
    NEW_TREE_EDITOR = 'NEW_TREE_EDITOR'
}

export interface App {
    appId: string;
}

export interface StorageSettings {
    appFilters?: AppFilters;
}

export interface AppFilters {
    [FILTERS_BLOGS_TAGS]?: BlogFiltersEntry[];
    [FILTERS_TUTORIALS_TAGS]?: TutorialsTagWithTitle[];
}
