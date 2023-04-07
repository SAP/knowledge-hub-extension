import { commands, window } from 'vscode';
import type { ExtensionContext } from 'vscode';

import { KnowledgeHubPanel } from './panels/knowledgeHubPanel';
import { logString } from './logger/logger';
import { initI18n } from './i18n';

/**
 *  Activate function is called by VSCode when the extension gets active.
 *
 * @param {ExtensionContext} context  - context from VSCode
 */
export async function activate(context: ExtensionContext): Promise<void> {
    // Initialize i18next
    await initI18n();

    context.subscriptions.push(
        commands.registerCommand('sap.ux.knowledgeHub.openKnowledgeHub', async () => {
            try {
                logString(`Knowledge Hub command called. Options: ${JSON.stringify(context.extensionPath)}`);
                const knowledgeHubPanel = new KnowledgeHubPanel(context);
                knowledgeHubPanel.show();
            } catch (error) {
                window.showErrorMessage(`Error while starting Knowledge Hub: ${(error as Error).message}`);
            }
        })
    );
}
