import type { WebviewPanel, ExtensionContext } from 'vscode';
import { Uri, ViewColumn, window } from 'vscode';
import i18next from 'i18next';

import { RESTART_WEBVIEW } from '@sap/knowledge-hub-extension-types';

import { MessageHandler } from '../knowledge-hub/messageHandler';
import { AppSession } from '../knowledge-hub/appSession';
import { getHtml, getWebviewUri } from '../utils/web';
import { Storage } from '../utils/storage';
import { errorInstance } from '../utils/error';
import { SEND_TELEMETRY } from '../utils/telemetry';
import { trackAction } from '../telemetry';

/**
 *  A class to handle the knowledge hub extension panel.
 */
export class KnowledgeHubPanel {
    // VSCode's Webview Panel
    public panel: WebviewPanel;

    // Application data/state
    private readonly appSession: AppSession;

    // file path to extension
    private extensionPath: string;

    // Webview message handler
    private readonly messageHandler: MessageHandler;

    /**
     * Initializes class properties.
     *
     * @param {ExtensionContext} context The extension path
     */
    constructor(context: ExtensionContext) {
        try {
            this.extensionPath = context.extensionPath;
            this.panel = this.createKnowledgeHubWebview();

            this.appSession = new AppSession({
                storage: new Storage(context.globalState, 'sap.ux.knowledgeHub.filters'),
                panel: this.panel
            });

            this.messageHandler = new MessageHandler(this.panel, this.appSession);
        } catch (error) {
            console.error(errorInstance(error).message);
            throw errorInstance(error);
        }
    }

    /**
     * Creates the page map web view.
     *
     * @returns a webview panel
     */
    public createKnowledgeHubWebview(): WebviewPanel {
        /**
         * vsce doesn't support pnpm (https://github.com/microsoft/vscode-vsce/issues/421), therefore node_modules from same repo are missing.
         * To overcome this we copy knowledgeHub.js and knowledgeHub.css to dist/ folder in esbuild.js
         * Ideally we would have a dependency to @sap/knowledge-hub-extension-webapp in do
         *
         * const webappDirPath = dirname(require.resolve('@sap/knowledge-hub-extension-webapp'));
         */
        const webappDirPath = __dirname;
        const viewRootUri = Uri.file(webappDirPath);

        // Create Webview panel
        const knowledgeHubWebView = window.createWebviewPanel(
            'knowledgeHub.knowledgeHubPanel',
            'Knowledge Hub extension by SAP',
            ViewColumn.Active,
            {
                enableCommandUris: true,
                enableScripts: true,
                retainContextWhenHidden: true,
                localResourceRoots: [viewRootUri],
                enableFindWidget: true
            }
        );

        const uri: string = getWebviewUri(knowledgeHubWebView.webview, viewRootUri).toString();

        knowledgeHubWebView.webview.html = getHtml(
            uri.toString(),
            i18next.t('KNOWLEDGE_HUB_VIEW_TITLE'),
            '/knowledgeHub.js',
            undefined,
            '/knowledgeHub.css'
        );

        // Register for incoming messages from web view
        knowledgeHubWebView.webview.onDidReceiveMessage(async (action) => {
            await this.messageHandler.processRequestAction(action);
            // Special case when restart is requested
            if (action.type === RESTART_WEBVIEW) {
                this.panel.dispose();
                this.panel = this.createKnowledgeHubWebview();
            }
            if (action.type === SEND_TELEMETRY) {
                trackAction(action);
            }
        });

        return knowledgeHubWebView;
    }

    public show(): void {
        this.panel.reveal();
    }
}
