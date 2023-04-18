import vscode from 'vscode';
import type { AnyAction } from '@sap/knowledge-hub-extension-types';
import { ActionHandler } from '../../../src/knowledge-hub/actionsHandler';
import { Storage } from '../../../src/utils/storage';

describe('actionsHandler', () => {
    let postMessage: (action: unknown) => Promise<void> = jest.fn();
    const webviewPostMessage = jest.fn();
    const getCalledActionsByType = (
        type: string,
        calls: Array<AnyAction[]> = webviewPostMessage.mock.calls
    ): AnyAction[] => {
        const actions: AnyAction[] = [];
        for (const call of calls) {
            if (call[0] && call[0].type === type) {
                actions.push(call[0]);
            }
        }
        return actions;
    };
    const onDidReceiveMessageMock = jest.fn().mockImplementation((message: (action: unknown) => Promise<void>) => {
        postMessage = message;
    });
    const onDidDisposeMock = jest.fn();
    const onDidChangeViewStateMock = jest.fn();
    const webViewPanel = {
        viewType: '',
        title: '',
        webview: {
            html: '',
            onDidReceiveMessage: onDidReceiveMessageMock,
            options: {},
            postMessage: webviewPostMessage,
            asWebviewUri: jest.fn().mockReturnValue(''),
            cspSource: ''
        },
        options: {},
        active: true,
        visible: true,
        onDidChangeViewState: onDidChangeViewStateMock,
        onDidDispose: onDidDisposeMock,
        reveal: jest.fn(),
        dispose: jest.fn()
    };

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

    const appSession = {
        storage: new Storage(extensionContext.globalState, 'app1'),
        panel: webViewPanel
    };

    const createWebviewPanelSpy = jest.spyOn(vscode.window, 'createWebviewPanel').mockImplementation(() => {
        return webViewPanel;
    });

    it('should test `ActionHandler` class', () => {
        const actionHandler = new ActionHandler(appSession, webViewPanel);
        expect(actionHandler).toBeDefined();
    });
});
