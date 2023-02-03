import { REJECTED_SUFFIX, PENDING_SUFFIX } from '@sap/knowledge-hub-extension-types';
import type { AnyAction, ErrorAction } from '@sap/knowledge-hub-extension-types';

/**
 * Return a rejected action if pending action.
 *
 * @param pendingAction any pending action
 * @param errorMessage a error message
 * @returns a rejected action or undefined if not pending
 */
export function getGenericRejectAction(pendingAction: AnyAction, errorMessage: string): AnyAction | undefined {
    if (pendingAction.type?.includes(PENDING_SUFFIX)) {
        const type = pendingAction.type.replace(PENDING_SUFFIX, REJECTED_SUFFIX);
        return {
            type,
            payload: pendingAction.payload,
            error: { message: errorMessage },
            showMessage: true
        } as ErrorAction<typeof type, any>;
    } else {
        return undefined;
    }
}
