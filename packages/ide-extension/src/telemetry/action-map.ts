import type { LogTelemetryEvent } from '@sap/knowledge-hub-extension-types';

import { KHUB_OPEN_BLOGS, KHUB_OPEN_TUTORIAL } from '@sap/knowledge-hub-extension-types';
import type { TelemetryUIOpenBlogProps, TelemetryUIOpenTutorialProps } from './types';

/**
 * Map redux action -> telemetry event properties
 * Requires respective redux action to be in allowedTelemetryActions in packages/webapp/src/webview/state/middleware.ts
 */
export const actionMap: {
    [action: string]: (action: LogTelemetryEvent) => any;
} = {
    [KHUB_OPEN_TUTORIAL]: (action: LogTelemetryEvent): TelemetryUIOpenTutorialProps => ({
        action: 'OPEN_TUTORIAL',
        title: action.payload?.title as string,
        primaryTag: action.payload?.primaryTag as string
    }),
    [KHUB_OPEN_BLOGS]: (action: LogTelemetryEvent): TelemetryUIOpenBlogProps => ({
        action: 'OPEN_BLOG',
        title: action.payload?.title as string,
        primaryTag: action.payload?.primaryTag as string
    })
};
