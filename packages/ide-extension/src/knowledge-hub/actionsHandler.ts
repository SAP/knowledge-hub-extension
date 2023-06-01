import type { WebviewPanel } from 'vscode';

import {
    KNOWLEDGE_HUB_WEB_VIEW_READY,
    TUTORIALS_FETCH_TUTORIALS,
    BLOGS_FETCH_BLOGS,
    FILTERS_BLOGS_TAGS,
    FILTERS_TUTORIALS_TAGS,
    TAGS_FETCH_TAGS,
    initialize,
    fetchBlogs,
    fetchHomeBlogs,
    fetchTutorials,
    fetchHomeTutorials,
    fetchTags,
    initBlogsFilters,
    initBlogsQuery,
    initTutorialsFilters
} from '@sap/knowledge-hub-extension-types';
import type {
    AnyAction,
    BlogsAPI,
    TutorialsAPI,
    TagsAPI,
    BlogFiltersEntry,
    TutorialsTagWithTitle
} from '@sap/knowledge-hub-extension-types';
import { getCommunityBlogsApi, getDeveloperTutorialsApi, getCommunityTagsApi } from '@sap/knowledge-hub-extension-core';

import type { AppSession } from './appSession';
import type { ActionsHandlerFn } from './types';

interface ActionsHandlersMap {
    [key: string]: ActionsHandlerFn;
}

/**
 * Class that handles all the actions dispatched from the webview.
 */
export class ActionHandler {
    // Application data/state
    private appSession: AppSession;

    // Webview reference
    private panel: WebviewPanel;

    private communityBlogsApi: BlogsAPI;
    private developerTutorialsApi: TutorialsAPI;
    private communityTagsApi: TagsAPI;

    /**
     * Initializes class properties.
     *
     * @param {AppSession} appSession The application session
     * @param {WebviewPanel} panel The vscode web panel
     */
    constructor(appSession: AppSession, panel: WebviewPanel) {
        this.appSession = appSession;
        this.panel = panel;

        this.communityBlogsApi = getCommunityBlogsApi();
        this.developerTutorialsApi = getDeveloperTutorialsApi();
        this.communityTagsApi = getCommunityTagsApi();
    }

    private getSavedBlogsFilters = async (): Promise<BlogFiltersEntry[]> => {
        return this.appSession.storage.getBlogsFilters();
    };

    private getSavedTutorialsFilters = async (): Promise<TutorialsTagWithTitle[]> => {
        return this.appSession.storage.getTutorialsFilters();
    };

    /**
     *
     * @param {AnyAction} action An action object
     */
    private fetchHomeTutorials = async (action: AnyAction): Promise<void> => {
        await this.panel.webview.postMessage(fetchHomeTutorials.pending(true));
        const response = await this.developerTutorialsApi.getTutorials(action.query);

        if (response.status === 'fetched' && response.data) {
            await this.panel.webview.postMessage(fetchHomeTutorials.fulfilled(response.data));
        }

        if (response.status === 'error') {
            const errorMsg = (response.error ? response.error : 'error') as unknown as string;
            await this.panel.webview.postMessage(fetchHomeTutorials.rejected(errorMsg));
        }
    };

    /**
     *
     * @param {AnyAction} action An action object
     * @returns void
     */
    private fetchTutorials = async (action: AnyAction): Promise<void> => {
        await this.panel.webview.postMessage(fetchTutorials.pending(true));
        const response = await this.developerTutorialsApi.getTutorials(action.query);

        // Save filters
        const filters = action.filters;
        await this.appSession.storage.setFilters(FILTERS_TUTORIALS_TAGS, filters);

        if (response.status === 'fetched' && response.data) {
            await this.panel.webview.postMessage(fetchTutorials.fulfilled(response.data));
        }

        if (response.status === 'error') {
            const errorMsg = (response.error ? response.error : 'error') as unknown as string;
            await this.panel.webview.postMessage(fetchTutorials.rejected(errorMsg));
        }
    };

    /**
     *
     * @param {AnyAction} action An action object
     * @returns void
     */
    private fetchHomeBlogs = async (action: AnyAction): Promise<void> => {
        await this.panel.webview.postMessage(fetchHomeBlogs.pending(true));
        const response = await this.communityBlogsApi.getBlogs(action.query);

        if (response.status === 'fetched' && response.data) {
            await this.panel.webview.postMessage(fetchHomeBlogs.fulfilled(response.data));
        }

        if (response.status === 'error') {
            const errorMsg = (response.error ? response.error : 'error') as unknown as string;
            await this.panel.webview.postMessage(fetchHomeBlogs.rejected(errorMsg));
        }
    };

    /**
     *
     * @param {AnyAction} action An action object
     * @returns void
     */
    private fetchBlogs = async (action: AnyAction): Promise<void> => {
        await this.panel.webview.postMessage(fetchBlogs.pending(true));
        const response = await this.communityBlogsApi.getBlogs(action.query);

        // Save filters
        const filters = action.filters;
        await this.appSession.storage.setFilters(FILTERS_BLOGS_TAGS, filters);

        if (response.status === 'fetched' && response.data) {
            await this.panel.webview.postMessage(fetchBlogs.fulfilled(response.data));
        }

        if (response.status === 'error') {
            const errorMsg = (response.error ? response.error : 'error') as unknown as string;
            await this.panel.webview.postMessage(fetchBlogs.rejected(errorMsg));
        }
    };

    /**
     *
     * @returns void
     */
    private fetchTags = async (): Promise<void> => {
        await this.panel.webview.postMessage(fetchTags.pending(true));
        const response = await this.communityTagsApi.getTags();

        if (response.status === 'fetched' && response.data) {
            await this.panel.webview.postMessage(fetchTags.fulfilled(response.data));
        }

        if (response.status === 'error') {
            const errorMsg = (response.error ? response.error : 'error') as unknown as string;
            await this.panel.webview.postMessage(fetchTags.rejected(errorMsg));
        }
    };

    // Webview actions handlers
    public actionsHandlersMap: ActionsHandlersMap = {
        [KNOWLEDGE_HUB_WEB_VIEW_READY]: async (): Promise<void> => {
            const blogsFilters: BlogFiltersEntry[] = await this.getSavedBlogsFilters();
            const tutorialsFilters: TutorialsTagWithTitle[] = await this.getSavedTutorialsFilters();

            await this.panel.webview.postMessage(
                initialize.fulfilled({
                    appId: 'sap.ux.knowledgeHub'
                })
            );

            await this.panel.webview.postMessage(initBlogsFilters.fulfilled(blogsFilters));
            await this.panel.webview.postMessage(initBlogsQuery.fulfilled(blogsFilters));

            await this.panel.webview.postMessage(initTutorialsFilters.fulfilled(tutorialsFilters));
        },
        [TUTORIALS_FETCH_TUTORIALS]: async (action: AnyAction): Promise<void> => {
            if (action.home) {
                await this.fetchHomeTutorials(action);
            } else {
                await this.fetchTutorials(action);
            }
        },
        [BLOGS_FETCH_BLOGS]: async (action: AnyAction): Promise<void> => {
            if (action.home) {
                await this.fetchHomeBlogs(action);
            } else {
                await this.fetchBlogs(action);
            }
        },
        [TAGS_FETCH_TAGS]: async (): Promise<void> => {
            await this.fetchTags();
        }
    };
}
