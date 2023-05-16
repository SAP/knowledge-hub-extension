import type { Memento } from 'vscode';
import type { WebviewPanel } from 'vscode';
import { Storage } from '../../../src/utils/storage';

import { AppSession } from '../../../src/knowledge-hub/appSession';

describe('actionsHandler', () => {
    it('tests the initialization of the AppSession class with a mock Storage and WebviewPanel', () => {
        const mockMemento = {
            get: jest.fn(),
            update: jest.fn()
        };

        const storage = new Storage(mockMemento as unknown as Memento, 'test');
        const panel: WebviewPanel = {} as WebviewPanel;
        const appSession = new AppSession({ storage, panel });

        expect(appSession.storage).toEqual(storage);
        expect(appSession.panel).toEqual(panel);

        expect(mockMemento.get).toHaveBeenCalledWith('test');
        expect(panel).toBeDefined();
    });
});
