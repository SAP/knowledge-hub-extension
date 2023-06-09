import type { WebviewPanel } from 'vscode';

import {
    KNOWLEDGE_HUB_WEB_VIEW_READY,
    TUTORIALS_FETCH_TUTORIALS,
    BLOGS_FETCH_BLOGS,
    FILTERS_BLOGS_TAGS,
    FILTERS_TUTORIALS_TAGS,
    TAGS_FETCH_BLOGS_TAGS,
    TAGS_FETCH_TUTORIALS_TAGS,
    initialize,
    fetchBlogs,
    fetchTutorials,
    fetchTutorialsTags,
    fetchBlogsTags,
    fetchBlogsTotalCount,
    fetchTutorialsTotalCount
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

import { logString } from '../logger/logger';
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

    private loadingTimeout: NodeJS.Timeout | undefined;

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

    /**
     * This should be the ONLY function that sends data to application info webview.
     *
     * @param action - the action to post to application info webview
     */
    private postActionToWebview(action: AnyAction): void {
        this.panel?.webview
            .postMessage(action)
            ?.then(undefined, (error) =>
                logString(`Error sending action to webview. Action was '${action?.type}'.\n${error?.toString()}`)
            );
    }
    /**
     * Return the saved blogs filters.
     *
     * @returns {BlogFiltersEntry[]} - The saved blogs filters
     */
    private getSavedBlogsFilters = async (): Promise<BlogFiltersEntry[]> => {
        return this.appSession.storage.getBlogsFilters();
    };

    /**
     * Return the saved tutorials filters.
     *
     * @returns {TutorialsTagWithTitle[]} - The saved tutorials filters
     */
    private getSavedTutorialsFilters = async (): Promise<TutorialsTagWithTitle[]> => {
        return this.appSession.storage.getTutorialsFilters();
    };

    /**
     * Sends a message to the webview to notify that it is ready to receive actions.
     */
    private webViewReady = async (): Promise<void> => {
        logString(`Webview is ready to receive actions`);

        const blogsFilters: BlogFiltersEntry[] = await this.getSavedBlogsFilters();
        const tutorialsFilters: TutorialsTagWithTitle[] = await this.getSavedTutorialsFilters();

        this.postActionToWebview(
            initialize.fulfilled({
                appId: 'sap.ux.knowledgeHub',
                appFilters: {
                    blogs: blogsFilters,
                    tutorials: tutorialsFilters
                }
            })
        );
    };

    /**
     * Fetches the tutorials from the API.
     *
     * @param {AnyAction} action An action object
     * @returns void
     */
    private fetchTutorials = async (action: AnyAction): Promise<void> => {
        clearTimeout(this.loadingTimeout);

        this.loadingTimeout = setTimeout(() => {
            this.postActionToWebview(fetchTutorials.pending(true));
        }, 2000);

        try {
            const response = await this.developerTutorialsApi.getTutorials(action.query);

            if (this.loadingTimeout) {
                clearTimeout(this.loadingTimeout);
            }
            // Save filters
            const filters = action.filters;
            await this.appSession.storage.setFilters(FILTERS_TUTORIALS_TAGS, filters);

            if (response.status === 'fetched' && response.data) {
                this.postActionToWebview(fetchTutorials.fulfilled({ data: response.data, query: action.query }));
                if (action.query.searchField !== '') {
                    this.postActionToWebview(fetchTutorialsTotalCount.fulfilled(response.data.numFound));
                } else {
                    this.postActionToWebview(fetchTutorialsTotalCount.fulfilled(-1));
                }
            }
            if (response.status === 'error') {
                const errorMsg = (response.error ? response.error : 'error') as unknown as string;
                this.postActionToWebview(fetchTutorials.rejected(errorMsg));
            }
        } catch (e) {
            clearTimeout(this.loadingTimeout);
            this.postActionToWebview(fetchTutorials.rejected('Error fetching tutorials'));
            logString(`Error fetching tutorials`);
            throw e;
        }
    };

    /**
     * Fetches the blogs from the API.
     *
     * @param {AnyAction} action An action object
     * @returns void
     */
    private fetchBlogs = async (action: AnyAction): Promise<void> => {
        clearTimeout(this.loadingTimeout);

        this.loadingTimeout = setTimeout(() => {
            this.postActionToWebview(fetchBlogs.pending(true));
        }, 2000);

        try {
            const response = await this.communityBlogsApi.getBlogs(action.query);

            if (this.loadingTimeout) {
                clearTimeout(this.loadingTimeout);
            }
            // Save filters
            const filters = action.filters;
            await this.appSession.storage.setFilters(FILTERS_BLOGS_TAGS, filters);

            if (response.status === 'fetched' && response.data) {
                this.postActionToWebview(fetchBlogs.fulfilled(response.data));
                if (action.query.searchTerm !== '') {
                    this.postActionToWebview(fetchBlogsTotalCount.fulfilled(response.data.totalCount));
                } else {
                    this.postActionToWebview(fetchBlogsTotalCount.fulfilled(-1));
                }
            }
            if (response.status === 'error') {
                const errorMsg = (response.error ? response.error : 'error') as unknown as string;
                this.postActionToWebview(fetchBlogs.rejected(errorMsg));
            }
        } catch (e) {
            clearTimeout(this.loadingTimeout);
            this.postActionToWebview(fetchBlogs.rejected('Error fetching blogs'));
            logString(`Error fetching blogs`);
            throw e;
        }
    };

    /**
     * Fetches the blogs tags from the API.
     *
     * @returns void
     */
    private fetchTagsBlogs = async (): Promise<void> => {
        clearTimeout(this.loadingTimeout);

        this.loadingTimeout = setTimeout(() => {
            this.postActionToWebview(fetchBlogsTags.pending(true));
        }, 2000);

        try {
            const response = await this.communityTagsApi.getBlogsTags();

            if (this.loadingTimeout) {
                clearTimeout(this.loadingTimeout);
            }
            if (response.status === 'fetched' && response.data) {
                this.postActionToWebview(fetchBlogsTags.fulfilled(response.data));
            }
            if (response.status === 'error') {
                const errorMsg = (response.error ? response.error : 'error') as unknown as string;
                this.postActionToWebview(fetchBlogsTags.rejected(errorMsg));
            }
        } catch (e) {
            clearTimeout(this.loadingTimeout);
            this.postActionToWebview(fetchBlogsTags.rejected('Error fetching blogs tags'));
            logString(`Error fetching blogs tags`);
            throw e;
        }
    };

    /**
     * Fetches the tutorials tags from the API.
     *
     * @returns void
     */
    private fetchTagsTutorials = async (): Promise<void> => {
        clearTimeout(this.loadingTimeout);

        this.loadingTimeout = setTimeout(() => {
            this.postActionToWebview(fetchTutorialsTags.pending(true));
        }, 2000);

        try {
            const response = await this.communityTagsApi.getTutorialsTags();

            if (this.loadingTimeout) {
                clearTimeout(this.loadingTimeout);
            }
            if (response.status === 'fetched' && response.data) {
                this.postActionToWebview(fetchTutorialsTags.fulfilled(response.data.tags));
            }

            if (response.status === 'error') {
                const errorMsg = (response.error ? response.error : 'error') as unknown as string;
                this.postActionToWebview(fetchTutorialsTags.rejected(errorMsg));
            }
        } catch (e) {
            clearTimeout(this.loadingTimeout);
            this.postActionToWebview(fetchBlogsTags.rejected('Error fetching tutorials tags'));
            logString(`Error fetching tutorials tags`);
            throw e;
        }
    };

    /**
     * Handles the action received from the webview.
     *
     * @type {ActionsHandlersMap}
     * @memberof ActionHandler
     */
    public actionsHandlersMap: ActionsHandlersMap = {
        [KNOWLEDGE_HUB_WEB_VIEW_READY]: async (): Promise<void> => {
            await this.webViewReady();
        },
        [TUTORIALS_FETCH_TUTORIALS]: async (action: AnyAction): Promise<void> => {
            await this.fetchTutorials(action);
        },
        [BLOGS_FETCH_BLOGS]: async (action: AnyAction): Promise<void> => {
            await this.fetchBlogs(action);
        },
        [TAGS_FETCH_BLOGS_TAGS]: async (): Promise<void> => {
            await this.fetchTagsBlogs();
        },
        [TAGS_FETCH_TUTORIALS_TAGS]: async (): Promise<void> => {
            await this.fetchTagsTutorials();
        }
    };
}
