import { KnowledgeHubActions, RESTART_WEBVIEW } from '@sap/knowledge-hub-extension-types';
import vscode from 'vscode';
import { window } from 'vscode';
import type { WebviewPanel } from 'vscode';
import { initI18n } from '../../../src/i18n';
import { KnowledgeHubPanel } from '../../../src/panels/knowledgeHubPanel';
type WebviewMessageCallback = (action: KnowledgeHubActions) => void;
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

describe('knowledgeHubPanel', () => {
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

    beforeAll(() => {
        initI18n();
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

    test('KnowledgeHub communication RESTART_WEBVIEW', async () => {
        // Mock setup
        let onDidReceiveMessageMock: WebviewMessageCallback = () => { };
        const webViewPanelMock = getWebViewPanelMock((callback: WebviewMessageCallback) => {
            onDidReceiveMessageMock = callback;
        });
        jest.spyOn(window, 'createWebviewPanel').mockImplementation(() => webViewPanelMock);

        // Test execution
        const panel = new KnowledgeHubPanel(extensionContext);
        panel.show();
        await onDidReceiveMessageMock({
            type: RESTART_WEBVIEW
        });

        // Result check
        expect(panel.createKnowledgeHubWebview()).toBeDefined();
    });
});
