import type { WebviewPanel } from 'vscode';
import type { AnyAction } from '@sap/knowledge-hub-extension-types';

import type { ActionHandlerResult, ActionsHandlerFn, ResponseActions } from './types';
import type { AppSession } from './appSession';

import { ActionHandler } from './actionsHandler';
import { getGenericRejectAction } from '../actions';

interface ActionHandleResult {
    status: boolean;
    response: ResponseActions;
}

/**
 * The calss to handle message coming from webview
 */
export class MessageHandler {
    private readonly actionHandler: ActionHandler;

    /**
     * Initializes class properties.
     *
     * @param {WebviewPanel} panel - The vscode web panel
     * @param {AppSession} appSession - The application session
     */
    constructor(private readonly panel: WebviewPanel, private readonly appSession: AppSession) {
        this.actionHandler = new ActionHandler(this.appSession, this.panel);
    }

    /**
     * Method processes single request action.
     *
     * @param {AnyAction} action Request action.
     */
    public async processRequestAction(action: AnyAction): Promise<void> {
        let responseActions: AnyAction[] = [];

        try {
            responseActions = await this.handleAction(action);
        } catch (error) {
            // get generic reject action for current action
            const genericRejectAction = getGenericRejectAction(action, this.getErrorMessage(error));
            if (genericRejectAction) {
                responseActions.push(genericRejectAction);
            }
        }

        await this.processResponseActions(responseActions);
    }

    /**
     * Method processes response actions.
     *
     * @param {AnyAction[]} responseActions List of responses.
     */
    private async processResponseActions(responseActions: AnyAction[]): Promise<void> {
        if (responseActions?.length) {
            for (const response of responseActions) {
                await this.panel.webview.postMessage(response);
            }
        }
    }

    /**
     * Method handles error formatting.
     *
     * @param {unknown} error - error thrown.
     * @returns {string} message - an error message.
     */
    private getErrorMessage(error: unknown): string {
        if (error instanceof Error) {
            return error.message;
        }
        return String(error);
    }

    /**
     * Private method handles action and then returns response action.
     *
     * @param {AnyAction} action Request action.
     * @returns {Promise<AnyAction[]>} Promise to response action
     */
    private async handleAction(action: AnyAction): Promise<AnyAction[]> {
        // Call local action handlers
        const handleResult = await this.callActionHandler(action);

        return handleResult?.response.actions || [];
    }

    /**
     * Method to handle action using local handler stored in 'actionsHandlersMap' and prepare state for further processing depending on handle result.
     *
     * @param {AnyAction} action Request action.
     * @returns Handler result.
     */
    private async callActionHandler(action: AnyAction): Promise<ActionHandleResult> {
        const response: ResponseActions = {
            actions: []
        };
        const handler: ActionsHandlerFn | undefined = this.actionHandler.actionsHandlersMap[action.type];
        let handleResult: void | ActionHandlerResult;
        let status = true;

        if (handler) {
            handleResult = await handler.call(this.actionHandler, action, response);

            if (handleResult && handleResult.status !== undefined) {
                status = handleResult.status;
            }
        }

        return {
            status,
            response
        };
    }
}
