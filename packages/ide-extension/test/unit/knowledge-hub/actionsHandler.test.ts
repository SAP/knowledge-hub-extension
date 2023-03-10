import vscode from 'vscode';
import type { AnyAction } from '@sap/knowledge-hub-extension-types';
import { ActionHandler } from '../../../src/knowledge-hub/actionsHandler';

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

    const createWebviewPanelSpy = jest.spyOn(vscode.window, 'createWebviewPanel').mockImplementation(() => {
        return webViewPanel;
    });

    it('should test `ActionHandler` class', () => {
        const actionHandler = new ActionHandler(webViewPanel);
        expect(actionHandler).toBeDefined();
    });
});
