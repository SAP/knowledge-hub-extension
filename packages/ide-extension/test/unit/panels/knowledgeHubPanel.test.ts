import vscode, { window } from 'vscode';
import type { WebviewPanel } from 'vscode';

import * as coreMock from '@sap/knowledge-hub-extension-core';
import type { TagsAPI, TutorialsAPI, BlogsAPI } from '@sap/knowledge-hub-extension-types';
import {
    KNOWLEDGE_HUB_WEB_VIEW_READY,
    TAGS_FETCH_BLOGS_TAGS,
    TAGS_FETCH_TUTORIALS_TAGS,
    BLOGS_FETCH_BLOGS,
    TUTORIALS_FETCH_TUTORIALS,
    AnyAction
} from '@sap/knowledge-hub-extension-types';

import * as logger from '../../../src/logger/logger';
import { KnowledgeHubPanel } from '../../../src/panels/knowledgeHubPanel';

describe('knowledgeHubPanel', () => {
    let loggerMock: jest.SpyInstance;
    const values: { [key: string]: unknown } = {};
    const extensionContext: vscode.ExtensionContext = {
        globalState: {
            get: (key: string): unknown => {
                return values[key];
            },
            update: (key: string, value: unknown): void => {
                values[key] = value;
            }
        } as vscode.Memento
    } as vscode.ExtensionContext;

    const delay = async (ms: number) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };
    type WebviewMessageCallback = (action: AnyAction) => void;

    const getWebViewPanelMock = (onDidReceiveMessage: (callback: WebviewMessageCallback) => void) =>
        ({
            webview: {
                message: '',
                html: '',
                onDidReceiveMessage,
                asWebviewUri: jest.fn().mockReturnValue(''),
                cspSource: '',
                postMessage: jest.fn()
            },
            onDidChangeViewState: jest.fn(),
            onDidDispose: jest.fn(),
            reveal: jest.fn()
        } as unknown as WebviewPanel);

    const getApiTagMock = (): TagsAPI =>
        ({
            getBlogsTags: async () => {
                await delay(3000);
                return Promise.resolve({
                    status: 'fetched',
                    error: undefined,
                    data: {
                        filteredTags: [
                            {
                                guid: '1',
                                displayName: 'tag1'
                            }
                        ]
                    }
                });
            },
            getTutorialsTags: async () => {
                await delay(3000);
                return Promise.resolve({
                    status: 'fetched',
                    error: undefined,
                    data: {
                        tags: {
                            '1': {
                                title: 'tag 1',
                                tagTitle: 'Tag 1',
                                tagAlternativeTitles: ['tag1']
                            }
                        }
                    }
                });
            }
        } as unknown as TagsAPI);

    const getApiTutorialsMock = (): TutorialsAPI =>
        ({
            getTutorials: async () => {
                await delay(3000);
                return Promise.resolve({
                    status: 'fetched',
                    error: undefined,
                    data: {}
                });
            }
        } as unknown as TutorialsAPI);

    const getApiBlogsMock = (): BlogsAPI =>
        ({
            getBlogs: async () => {
                await delay(3000);
                return Promise.resolve({
                    status: 'fetched',
                    error: undefined,
                    data: {}
                });
            }
        } as unknown as BlogsAPI);

    beforeEach(() => {
        jest.clearAllMocks();
        loggerMock = jest.spyOn(logger, 'logString').mockImplementation(() => null);
    });

    it('should test `KnowledgeHubPanel` class', () => {
        const knowledgeHubPanel = new KnowledgeHubPanel(extensionContext);
        expect(knowledgeHubPanel).toBeDefined();
        expect(knowledgeHubPanel.panel).toBeDefined();
    });

    it('should test createKnowledgeHubWebview', () => {
        const knowledgeHubPanel = new KnowledgeHubPanel(extensionContext);
        const webviewPanel = knowledgeHubPanel.createKnowledgeHubWebview();
        expect(webviewPanel).toBeDefined();
    });

    test('GuidedAnswersPanel communication WEBVIEW_READY', async () => {
        // Mock setup
        let onDidReceiveMessageMock: WebviewMessageCallback = () => {};
        const webViewPanelMock = getWebViewPanelMock((callback: WebviewMessageCallback) => {
            onDidReceiveMessageMock = callback;
        });
        jest.spyOn(window, 'createWebviewPanel').mockImplementation(() => webViewPanelMock);

        // Test execution
        const panel = new KnowledgeHubPanel(extensionContext);
        panel.show();
        onDidReceiveMessageMock({ type: KNOWLEDGE_HUB_WEB_VIEW_READY });

        // Result check
        expect(loggerMock).toBeCalledWith('Webview is ready to receive actions');
    });

    test('GuidedAnswersPanel communication TAGS_FETCH_BLOGS_TAGS', async () => {
        // Mock setup
        let onDidReceiveMessageMock: WebviewMessageCallback = () => {};
        const webViewPanelMock = getWebViewPanelMock((callback: WebviewMessageCallback) => {
            onDidReceiveMessageMock = callback;
        });
        jest.spyOn(window, 'createWebviewPanel').mockImplementation(() => webViewPanelMock);
        jest.spyOn(coreMock, 'getCommunityTagsApi').mockImplementation(() => getApiTagMock());

        // Test execution
        const panel = new KnowledgeHubPanel(extensionContext);
        panel.show();
        await onDidReceiveMessageMock({ type: TAGS_FETCH_BLOGS_TAGS });

        // Result check
        expect(webViewPanelMock.webview.postMessage).toHaveBeenNthCalledWith(1, {
            type: '[core] tags/fetch/blogs-tags <pending>',
            payload: undefined,
            pending: true
        });

        expect(webViewPanelMock.webview.postMessage).toHaveBeenNthCalledWith(2, {
            type: '[core] tags/fetch/blogs-tags <fulfilled>',
            payload: {
                filteredTags: [
                    {
                        guid: '1',
                        displayName: 'tag1'
                    }
                ]
            }
        });
    });

    test('GuidedAnswersPanel communication TAGS_FETCH_TUTORIALS_TAGS', async () => {
        // Mock setup
        let onDidReceiveMessageMock: WebviewMessageCallback = () => {};
        const webViewPanelMock = getWebViewPanelMock((callback: WebviewMessageCallback) => {
            onDidReceiveMessageMock = callback;
        });
        jest.spyOn(window, 'createWebviewPanel').mockImplementation(() => webViewPanelMock);
        jest.spyOn(coreMock, 'getCommunityTagsApi').mockImplementation(() => getApiTagMock());

        // Test execution
        const panel = new KnowledgeHubPanel(extensionContext);
        panel.show();
        await onDidReceiveMessageMock({ type: TAGS_FETCH_TUTORIALS_TAGS });

        // Result check
        expect(webViewPanelMock.webview.postMessage).toHaveBeenNthCalledWith(1, {
            type: '[core] tags/fetch/tutorials-tags <pending>',
            payload: undefined,
            pending: true
        });

        expect(webViewPanelMock.webview.postMessage).toHaveBeenNthCalledWith(2, {
            type: '[core] tags/fetch/tutorials-tags <fulfilled>',
            payload: {
                '1': {
                    title: 'tag 1',
                    tagTitle: 'Tag 1',
                    tagAlternativeTitles: ['tag1']
                }
            }
        });
    });

    test('GuidedAnswersPanel communication TUTORIALS_FETCH_TUTORIALS', async () => {
        // Mock setup
        let onDidReceiveMessageMock: WebviewMessageCallback = () => {};
        const webViewPanelMock = getWebViewPanelMock((callback: WebviewMessageCallback) => {
            onDidReceiveMessageMock = callback;
        });
        jest.spyOn(window, 'createWebviewPanel').mockImplementation(() => webViewPanelMock);
        jest.spyOn(coreMock, 'getDeveloperTutorialsApi').mockImplementation(() => getApiTutorialsMock());

        // Test execution
        const panel = new KnowledgeHubPanel(extensionContext);
        panel.show();
        await onDidReceiveMessageMock({ type: TUTORIALS_FETCH_TUTORIALS });

        // Result check
        expect(webViewPanelMock.webview.postMessage).toHaveBeenNthCalledWith(1, {
            type: '[core] tutorials/fetch <pending>',
            payload: undefined,
            pending: true
        });

        expect(webViewPanelMock.webview.postMessage).toHaveBeenNthCalledWith(2, {
            type: '[core] tutorials/fetch <fulfilled>',
            payload: {
                data: {},
                query: undefined
            }
        });
    });

    test('GuidedAnswersPanel communication BLOGS_FETCH_BLOGS', async () => {
        // Mock setup
        let onDidReceiveMessageMock: WebviewMessageCallback = () => {};
        const webViewPanelMock = getWebViewPanelMock((callback: WebviewMessageCallback) => {
            onDidReceiveMessageMock = callback;
        });
        jest.spyOn(window, 'createWebviewPanel').mockImplementation(() => webViewPanelMock);
        jest.spyOn(coreMock, 'getCommunityBlogsApi').mockImplementation(() => getApiBlogsMock());

        // Test execution
        const panel = new KnowledgeHubPanel(extensionContext);
        panel.show();
        await onDidReceiveMessageMock({ type: BLOGS_FETCH_BLOGS });

        // Result check
        expect(webViewPanelMock.webview.postMessage).toHaveBeenNthCalledWith(1, {
            type: '[core] blogs/fetch <pending>',
            payload: undefined,
            pending: true
        });

        expect(webViewPanelMock.webview.postMessage).toHaveBeenNthCalledWith(2, {
            type: '[core] blogs/fetch <fulfilled>',
            payload: {}
        });
    });
});
