import type { Middleware, MiddlewareAPI, Dispatch, Action } from 'redux';
import { createLogger } from 'redux-logger';

declare let window: Window;
declare let acquireVsCodeApi: () => typeof window['vscode'];

/**
 * Communication between IDE extension and web view is realized through the postMessageMiddleware middleware.
 *
 * @param store - redux store
 * @returns {Middleware} - the middleware
 */
export const postMessageMiddleware: Middleware = (store: MiddlewareAPI) => {
    // Add event handler, this will dispatch incomming state updates
    window.addEventListener('message', (event: MessageEvent) => {
        if (event.origin === window.origin && event.data && typeof event.data.type === 'string') {
            store.dispatch(event.data);
        }
    });
    try {
        window.vscode = acquireVsCodeApi();
    } catch (e) {
        console.warn('Cannot acquire VSCode API. Not running in VSCode webview');
    }
    return (next: Dispatch) =>
        (action): Action => {
            action = next(action);
            if (action && typeof action.type === 'string' && !action.type.startsWith('[view]')) {
                window.vscode.postMessage(action);
            }
            return action;
        };
};

export const loggerMiddleware = createLogger({
    duration: true
});
