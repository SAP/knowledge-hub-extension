import type {
    KnowledgeHubWebViewReady,
    TutorialsFetchTutorials,
    TutorialsSearchQuery,
    BlogsFetchBlogs,
    BlogsSearchQuery,
    BlogFiltersEntry,
    Tag,
    TagsFetchTags,
    TutorialsTagWithTitle,
    SendTelemetry
} from '@sap/knowledge-hub-extension-types';

import {
    KNOWLEDGE_HUB_WEB_VIEW_READY,
    TUTORIALS_FETCH_TUTORIALS,
    TAGS_FETCH_TAGS,
    BLOGS_FETCH_BLOGS,
    createViewAction
} from '@sap/knowledge-hub-extension-types';

export const knowledgeHubWebViewReady = (): KnowledgeHubWebViewReady => ({
    type: KNOWLEDGE_HUB_WEB_VIEW_READY
});

export const tutorialsFetchTutorials = (
    query: TutorialsSearchQuery,
    filters: TutorialsTagWithTitle[],
    home: boolean
): TutorialsFetchTutorials => ({
    type: TUTORIALS_FETCH_TUTORIALS,
    query,
    filters,
    home
});

export const blogsFetchBlogs = (
    query: BlogsSearchQuery,
    filters: BlogFiltersEntry[],
    home: boolean
): BlogsFetchBlogs => ({
    type: BLOGS_FETCH_BLOGS,
    query,
    filters,
    home
});
export const sendTutorialDataToTelemetry = (_title: string, _primaryTag: string): SendTelemetry => ({
    type: 'SEND_TELEMETRY',
    source: 'tutorials',
    title: _title,
    primaryTag: _primaryTag
});
export const sendBlogDataToTelemetry = (_title: string, _primaryTag: string): SendTelemetry => ({
    type: 'SEND_TELEMETRY',
    source: 'blogs',
    title: _title,
    primaryTag: _primaryTag
});

export const tagsFetchTags = (): TagsFetchTags => ({
    type: TAGS_FETCH_TAGS
});

// Search actions
export const searchTermChanged = createViewAction<string>('app/change-searchTerm');

// blogs actions
export const blogsPageChanged = createViewAction<number>('blogs/change-page');
export const blogsManagedTagsAdd = createViewAction<string>('blogs/managed-tags-add');
export const blogsManagedTagsDelete = createViewAction<string>('blogs/managed-tags-delete');
export const blogsManagedTagsDeleteAll = createViewAction('blogs/managed-tags-delete-all');
export const blogsTagsAdd = createViewAction<Tag>('blogs/tags-add');
export const blogsLanguageUpdate = createViewAction<string | null>('blogs/language-update');
export const blogsCategoryAdd = createViewAction<string>('blogs/category-add');
export const blogsCategoryDelete = createViewAction<string>('blogs/category-delete');
export const blogsCategoryDeleteAll = createViewAction('blogs/category-delete-all');
export const blogsFiltersSelected = createViewAction<boolean>('blogs/filters-selected');
export const blogsLoading = createViewAction<boolean>('blogs/loading');
export const blogsFilterEntryAdd = createViewAction<BlogFiltersEntry>('blogs/filter-entry-add');
export const blogsFilterEntryDelete = createViewAction<string>('blogs/filter-entry-delete');
export const blogsFilterEntryDeleteAll = createViewAction('blogs/filter-entry-delete-all');
export const blogsSearchTermChanged = createViewAction<string>('blogs/change-searchTerm');

// tutorials actions
export const tutorialsPageChanged = createViewAction<number>('tutorials/change-page');
export const tutorialsFiltersTagsAdd = createViewAction<string>('tutorials/filters-tags-add');
export const tutorialsFiltersTagsDelete = createViewAction<string>('tutorials/filters-tags-delete');
export const tutorialsFiltersTagsDeleteAll = createViewAction('tutorials/filters-tags-delete-all');
export const tutorialsFiltersTagsResetWith = createViewAction<string>('tutorials/filters-tags-reset-with');
export const tutorialsFiltersSelected = createViewAction<boolean>('tutorials/filters-selected');
export const tutorialsSearchFieldChanged = createViewAction<string>('tutorials/change-searchField');
export const tutorialsLoading = createViewAction<boolean>('tutorials/loading');
