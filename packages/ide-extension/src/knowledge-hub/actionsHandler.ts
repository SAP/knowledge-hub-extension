import type { WebviewPanel } from 'vscode';

import {
    KNOWLEDGE_HUB_WEB_VIEW_READY,
    TUTORIALS_FETCH_TUTORIALS,
    BLOGS_FETCH_BLOGS,
    TAGS_FETCH_TAGS,
    initialize,
    fetchBlogs,
    fetchHomeBlogs,
    fetchTutorials,
    fetchHomeTutorials,
    fetchTags
} from '@sap/knowledge-hub-extension-types';
import type { AnyAction, BlogsAPI, TutorialsAPI, TagsAPI } from '@sap/knowledge-hub-extension-types';
import { getCommunityBlogsApi, getDeveloperTutorialsApi, getCommunityTagsApi } from '@sap/knowledge-hub-extension-core';

import type { ActionsHandlerFn } from './types';

interface ActionsHandlersMap {
    [key: string]: ActionsHandlerFn;
}

/**
 * Class that handles all the actions dispatched from the webview.
 */
export class ActionHandler {
    private panel: WebviewPanel;

    private communityBlogsApi: BlogsAPI;
    private developerTutorialsApi: TutorialsAPI;
    private communityTagsApi: TagsAPI;

    /**
     * Initializes class properties.
     *
     * @param {WebviewPanel} panel The vscode web panel
     */
    constructor(panel: WebviewPanel) {
        this.panel = panel;

        this.communityBlogsApi = getCommunityBlogsApi();
        this.developerTutorialsApi = getDeveloperTutorialsApi();
        this.communityTagsApi = getCommunityTagsApi();
    }

    /**
     *
     * @param {AnyAction} action An action object
     */
    private fetchHomeTutorials = async (action: AnyAction): Promise<void> => {
        this.panel.webview.postMessage(fetchHomeTutorials.pending(true));
        const response = await this.developerTutorialsApi.getTutorials(action.options);

        if (response.status === 'fetched' && response.data) {
            this.panel.webview.postMessage(fetchHomeTutorials.fulfilled(response.data));
        }

        if (response.status === 'error') {
            const errorMsg = (response.error ? response.error : 'error') as unknown as string;
            this.panel.webview.postMessage(fetchHomeTutorials.rejected(errorMsg));
        }
    };

    /**
     *
     * @param {AnyAction} action An action object
     * @returns void
     */
    private fetchTutorials = async (action: AnyAction): Promise<void> => {
        this.panel.webview.postMessage(fetchTutorials.pending(true));
        const response = await this.developerTutorialsApi.getTutorials(action.options);

        if (response.status === 'fetched' && response.data) {
            this.panel.webview.postMessage(fetchTutorials.fulfilled(response.data));
        }

        if (response.status === 'error') {
            const errorMsg = (response.error ? response.error : 'error') as unknown as string;
            this.panel.webview.postMessage(fetchTutorials.rejected(errorMsg));
        }
    };

    /**
     *
     * @param {AnyAction} action An action object
     * @returns void
     */
    private fetchHomeBlogs = async (action: AnyAction): Promise<void> => {
        this.panel.webview.postMessage(fetchHomeBlogs.pending(true));
        const response = await this.communityBlogsApi.getBlogs(action.options);

        if (response.status === 'fetched' && response.data) {
            this.panel.webview.postMessage(fetchHomeBlogs.fulfilled(response.data));
        }

        if (response.status === 'error') {
            const errorMsg = (response.error ? response.error : 'error') as unknown as string;
            this.panel.webview.postMessage(fetchHomeBlogs.rejected(errorMsg));
        }
    };

    /**
     *
     * @param {AnyAction} action An action object
     * @returns void
     */
    private fetchBlogs = async (action: AnyAction): Promise<void> => {
        this.panel.webview.postMessage(fetchBlogs.pending(true));
        const response = await this.communityBlogsApi.getBlogs(action.options);

        if (response.status === 'fetched' && response.data) {
            this.panel.webview.postMessage(fetchBlogs.fulfilled(response.data));
        }

        if (response.status === 'error') {
            const errorMsg = (response.error ? response.error : 'error') as unknown as string;
            this.panel.webview.postMessage(fetchBlogs.rejected(errorMsg));
        }
    };

    /**
     *
     * @returns void
     */
    private fetchTags = async (): Promise<void> => {
        this.panel.webview.postMessage(fetchTags.pending(true));
        const response = await this.communityTagsApi.getTags();

        if (response.status === 'fetched' && response.data) {
            this.panel.webview.postMessage(fetchTags.fulfilled(response.data));
        }

        if (response.status === 'error') {
            const errorMsg = (response.error ? response.error : 'error') as unknown as string;
            this.panel.webview.postMessage(fetchTags.rejected(errorMsg));
        }
    };

    // Webview actions handlers
    public actionsHandlersMap: ActionsHandlersMap = {
        [KNOWLEDGE_HUB_WEB_VIEW_READY]: async (): Promise<void> => {
            this.panel.webview.postMessage(
                initialize.fulfilled({
                    appId: 'KnowledgeHub'
                })
            );
        },
        [TUTORIALS_FETCH_TUTORIALS]: async (action: AnyAction): Promise<void> => {
            if (action.home) {
                this.fetchHomeTutorials(action);
            } else {
                this.fetchTutorials(action);
            }
        },
        [BLOGS_FETCH_BLOGS]: async (action: AnyAction): Promise<void> => {
            if (action.home) {
                this.fetchHomeBlogs(action);
            } else {
                this.fetchBlogs(action);
            }
        },
        [TAGS_FETCH_TAGS]: async (): Promise<void> => {
            this.fetchTags();
        }
    };
}
