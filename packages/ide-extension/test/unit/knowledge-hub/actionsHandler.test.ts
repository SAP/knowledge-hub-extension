import vscode from 'vscode';
import { ActionHandler } from '../../../src/knowledge-hub/actionsHandler';
import { Storage } from '../../../src/utils/storage';

describe('actionsHandler', () => {
    const webviewPostMessage = jest.fn();
    const onDidReceiveMessageMock = jest.fn().mockImplementation((message: (action: unknown) => Promise<void>) => {});
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
        viewColumn: vscode.ViewColumn.One,
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

    it('should test `ActionHandler` class', () => {
        const actionHandler = new ActionHandler(appSession, webViewPanel);
        expect(actionHandler).toBeDefined();
    });
});
