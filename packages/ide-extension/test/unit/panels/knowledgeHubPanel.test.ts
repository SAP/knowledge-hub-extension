import vscode from 'vscode';
import { initI18n } from '../../../src/i18n';

import { KnowledgeHubPanel } from '../../../src/panels/knowledgeHubPanel';

describe('knowledgeHubPanel', () => {
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

    beforeAll(() => {
        initI18n();
    });

    it('should test `KnowledgeHubPanel` class', () => {
        const knowledgeHubPanel = new KnowledgeHubPanel(extensionContext);
        expect(knowledgeHubPanel).toBeDefined();
        expect(knowledgeHubPanel.panel).toBeDefined();
    });

    it('should test createKnowledgeHubWebview', () => {
        const knowledgeHubPanel = new KnowledgeHubPanel(extensionContext);
        const webviewPanel = knowledgeHubPanel.createKnowledgeHubWebview();
        expect(webviewPanel).toBeDefined();
    });
});
