import type { TFunctionKeys, TFunctionResult } from 'i18next';
import i18next from 'i18next';
import { initI18n } from '../../../src/i18n';

import * as types from '@sap/knowledge-hub-extension-types';
import { KnowledgeHubPanel } from '../../../src/panels/knowledgeHubPanel';

beforeAll(() => {
    initI18n();
});

describe('knowledgeHubPanel', () => {
    it('shoud test `KnowledgeHubPanel` class', () => {
        const knowledgeHubPanel = new KnowledgeHubPanel('extensionPath');
        expect(knowledgeHubPanel).toBeDefined();
        expect(knowledgeHubPanel.panel).toBeDefined();
    });

    it('shoud test createKnowledgeHubWebview', () => {
        const knowledgeHubPanel = new KnowledgeHubPanel('extensionPath');
        const webviewPanel = knowledgeHubPanel.createKnowledgeHubWebview();
        expect(webviewPanel).toBeDefined();
    });
});
