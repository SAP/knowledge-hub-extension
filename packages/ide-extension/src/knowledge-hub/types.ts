import type { AnyAction } from '@sap/knowledge-hub-extension-types';

export interface ResponseActions {
    actions: AnyAction[];
}

export type ActionHandlerResult = { status?: boolean } | undefined;

export type ActionsHandlerFn = (
    action: AnyAction,
    response: ResponseActions
) => (ActionHandlerResult | undefined | void) | Promise<ActionHandlerResult | void>;
