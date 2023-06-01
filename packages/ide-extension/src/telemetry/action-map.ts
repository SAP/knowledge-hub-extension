import type {
    KnowledgeHubOpenBlogPayload,
    KnowledgeHubOpenTutorialPayload,
    LogTelemetryEvent
} from '@sap/knowledge-hub-extension-types';

import { KHUB_OPEN_BLOGS, KHUB_OPEN_TUTORIAL, RESTART_WEBVIEW } from '@sap/knowledge-hub-extension-types';

/**
 * Map redux action -> telemetry event properties
 * Requires respective redux action to be in allowedTelemetryActions in packages/webapp/src/webview/state/middleware.ts
 */
export const actionMap: {
    [action: string]: (action: LogTelemetryEvent) => any;
} = {
    [KHUB_OPEN_TUTORIAL]: (action: LogTelemetryEvent): KnowledgeHubOpenTutorialPayload => ({
        action: 'OPEN_TUTORIAL',
        title: action.payload.payload.title,
        primaryTag: action.payload.payload.primaryTag
    }),
    [KHUB_OPEN_BLOGS]: (action: LogTelemetryEvent): KnowledgeHubOpenBlogPayload => ({
        action: 'OPEN_BLOG',
        title: action.payload.payload.title,
        primaryTag: action.payload.payload.primaryTag
    }),
    [RESTART_WEBVIEW]: (): any => ({
        action: RESTART_WEBVIEW
    })
};
