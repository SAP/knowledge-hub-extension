import type { TutorialsSearchQuery, TutorialsTagWithTitle } from './tutorials.types';
import type { BlogsSearchQuery, BlogFiltersEntry } from './blogs.types';
import type { KnowledgeHubOpenBlogPayload, KnowledgeHubOpenTutorialPayload } from './app.types';

export interface PendingActions {
    [key: string]: boolean;
}

export interface Action<T = any> {
    type: T;
}

export interface AnyAction extends Action {
    [extraProps: string]: any;
}

/**
 * Action related types
 */
export type Actions = KnowledgeHubWebViewReady | TutorialsFetchTutorials | BlogsFetchBlogs;

// Action types that are handled by middleware (ide extension)
export const RESTART_WEBVIEW = 'RESTART_WEBVIEW';
export const KNOWLEDGE_HUB_WEB_VIEW_READY = 'KNOWLEDGE_HUB_WEB_VIEW_READY';
export const TUTORIALS_FETCH_TUTORIALS = 'TUTORIALS_FETCH_TUTORIALS';
export const BLOGS_FETCH_BLOGS = 'BLOGS_FETCH_BLOGS';
export const TAGS_FETCH_TAGS = 'TAGS_FETCH_TAGS';
export const HOME_FETCH_TUTORIALS = 'HOME_FETCH_TUTORIALS';
export const HOME_FETCH_BLOGS = 'HOME_FETCH_BLOGS';
export const LOG_TELEMETRY_EVENT = 'LOG_TELEMETRY_EVENT';
export const KHUB_OPEN_TUTORIAL = 'KHUB_OPEN_TUTORIAL';
export const KHUB_OPEN_BLOGS = 'KHUB_OPEN_BLOGS';

export type KnowledgeHubActions = RestartWebviewAction | KnowledgeHubTelemetryAction;

export interface RestartWebviewAction {
    type: typeof RESTART_WEBVIEW;
}

export interface KnowledgeHubTelemetryAction {
    type: typeof LOG_TELEMETRY_EVENT;
    payload: KnowledgeHubTelemetryAllowedActions;
}

export type KnowledgeHubTelemetryAllowedActions =  KnowledgeHubOpenBlogPayload | KnowledgeHubOpenTutorialPayload;
    
// Actions
export interface KnowledgeHubWebViewReady {
    type: typeof KNOWLEDGE_HUB_WEB_VIEW_READY;
}

export interface TutorialsFetchTutorials {
    type: typeof TUTORIALS_FETCH_TUTORIALS;
    query: TutorialsSearchQuery;
    filters: TutorialsTagWithTitle[];
    home: boolean;
}

export interface BlogsFetchBlogs {
    type: typeof BLOGS_FETCH_BLOGS;
    query: BlogsSearchQuery;
    filters: BlogFiltersEntry[];
    home: boolean;
}

export interface TagsFetchTags {
    type: typeof TAGS_FETCH_TAGS;
}
