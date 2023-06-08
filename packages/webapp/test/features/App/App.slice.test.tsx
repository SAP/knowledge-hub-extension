import { initialize, fetchBlogsTotalCount, fetchTutorialsTotalCount } from '@sap/knowledge-hub-extension-types';
import reducer, { getAppId, getAppReady, getAppTabs } from '../../../src/webview/features/app/App.slice';
import { appBlogsTotalCountUpdate, appTutorialsTotalCountUpdate } from '../../../src/webview/store/actions';
import {
    appInitialState,
    appInitialStateReady,
    appStateWithTabsWithBlogsCount,
    appStateWithTabsWithTutorialsCount
} from '../../__mocks__/app';
import { rootState } from '../../../test/__mocks__/store.mock';

describe('app slice', () => {
    describe('app slice > actions', () => {
        test('initialize', () => {
            const expectedAction = {
                type: '[core] app/initialize <fulfilled>',
                payload: {
                    appId: 'KnowledgeHubExtension',
                    appFilters: {}
                }
            };

            expect(initialize.fulfilled({ appId: 'KnowledgeHubExtension', appFilters: {} })).toEqual(expectedAction);
        });
    });

    describe('app slice > reducer', () => {
        test('initial state', () => {
            expect(reducer(undefined, { type: 'action' })).toEqual(appInitialState);
        });

        test('initialize action', () => {
            const action = initialize.fulfilled({ appId: '', appFilters: {} });
            expect(reducer(undefined, action)).toEqual(appInitialStateReady);
        });

        test('fetchBlogsTotalCount fulfilled action', () => {
            const action = fetchBlogsTotalCount.fulfilled(10);
            expect(reducer(undefined, action)).toEqual(appStateWithTabsWithBlogsCount);
        });

        test('fetchTutorialsTotalCount fulfilled action', () => {
            const action = fetchTutorialsTotalCount.fulfilled(10);
            expect(reducer(undefined, action)).toEqual(appStateWithTabsWithTutorialsCount);
        });

        test('appBlogsTotalCountUpdate fulfilled action', () => {
            const action = appBlogsTotalCountUpdate(10);
            expect(reducer(undefined, action)).toEqual(appStateWithTabsWithBlogsCount);
        });

        test('appTutorialsTotalCountUpdate fulfilled action', () => {
            const action = appTutorialsTotalCountUpdate(10);
            expect(reducer(undefined, action)).toEqual(appStateWithTabsWithTutorialsCount);
        });
    });

    describe('app slice > state selector', () => {
        test('app slice > state selector > getAppId', () => {
            expect(getAppId(rootState)).toEqual(appInitialState.app.appId);
        });
        test('app slice > state selector > getAppReady', () => {
            expect(getAppReady(rootState)).toEqual(appInitialState.ui.ready);
        });
        test('app slice > state selector > getAppTabs', () => {
            expect(getAppTabs(rootState)).toEqual(appInitialState.ui.tabs);
        });
    });
});
