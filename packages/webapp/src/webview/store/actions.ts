import type {
    KnowledgeHubWebViewReady,
    TutorialsFetchTutorials,
    BlogsFetchBlogs,
    TutorialsSearchQuery,
    BlogsSearchQuery,
    BlogsManagedTag
} from '@sap/knowledge-hub-extension-types';

import {
    KNOWLEDGE_HUB_WEB_VIEW_READY,
    TUTORIALS_FETCH_TUTORIALS,
    BLOGS_FETCH_BLOGS,
    createViewAction
} from '@sap/knowledge-hub-extension-types';

export const knowledgeHubWebViewReady = (): KnowledgeHubWebViewReady => ({
    type: KNOWLEDGE_HUB_WEB_VIEW_READY
});

export const tutorialsFetchTutorials = (options: TutorialsSearchQuery, home: boolean): TutorialsFetchTutorials => ({
    type: TUTORIALS_FETCH_TUTORIALS,
    options,
    home
});

export const blogsFetchBlogs = (options: BlogsSearchQuery, home: boolean): BlogsFetchBlogs => ({
    type: BLOGS_FETCH_BLOGS,
    options,
    home
});

export const searchTermChanged = createViewAction<string>('app/change-searchTerm');

// blogs actions
export const blogsPageChanged = createViewAction<number>('blogs/change-page');
export const blogsManagedTagsAdd = createViewAction<string>('blogs/managed-tags-add');
export const blogsManagedTagsDelete = createViewAction<string>('blogs/managed-tags-delete');
export const blogsManagedTagsDeleteAll = createViewAction('blogs/managed-tags-delete-all');
export const blogsTagsAdd = createViewAction<BlogsManagedTag>('blogs/tags-add');

// tutorials actions
export const tutorialsPageChanged = createViewAction<number>('tutorials/change-page');
