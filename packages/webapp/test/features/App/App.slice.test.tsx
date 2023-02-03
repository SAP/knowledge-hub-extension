import { initialize } from '@sap/knowledge-hub-extension-types';
import reducer from '../../../src/webview/features/app/App.slice';

describe('app slice', () => {
    describe('actions', () => {
        test('initialize', () => {
            const expectedAction = {
                type: '[core] app/initialize <fulfilled>',
                payload: {
                    appId: 'KnowledgeHubExtension'
                }
            };

            expect(initialize.fulfilled({ appId: 'KnowledgeHubExtension' })).toEqual(expectedAction);
        });
    });

    describe('reducer', () => {
        test('initial state', () => {
            expect(reducer(undefined, { type: 'action' })).toEqual({ appId: '' });
        });
        test('initialize action', () => {
            const action = initialize.fulfilled({ appId: 'app' });
            expect(reducer(undefined, action)).toEqual({ appId: 'app' });
        });
    });
});
