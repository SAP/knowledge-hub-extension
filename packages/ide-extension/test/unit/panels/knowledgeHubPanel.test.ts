import { initI18n } from '../../../src/i18n';

import { KnowledgeHubPanel } from '../../../src/panels/knowledgeHubPanel';

beforeAll(() => {
    initI18n();
});

describe('knowledgeHubPanel', () => {
    it('should test `KnowledgeHubPanel` class', () => {
        const knowledgeHubPanel = new KnowledgeHubPanel('extensionPath');
        expect(knowledgeHubPanel).toBeDefined();
        expect(knowledgeHubPanel.panel).toBeDefined();
    });

    it('should test createKnowledgeHubWebview', () => {
        const knowledgeHubPanel = new KnowledgeHubPanel('extensionPath');
        const webviewPanel = knowledgeHubPanel.createKnowledgeHubWebview();
        expect(webviewPanel).toBeDefined();
    });
});
