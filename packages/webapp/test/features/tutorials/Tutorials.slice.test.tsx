import { fetchTutorials } from '@sap/knowledge-hub-extension-types';
import type { Tutorials } from '@sap/knowledge-hub-extension-types';
import reducer from '../../../src/webview/features/tutorials/Tutorials.slice';
import { tutorialsPageChanged } from '../../../src/webview/store/actions';
import {
    initial,
    tutorialsData,
    withDataNoErrorNoTags,
    withNoDataWithError,
    withNoDataWithPending
} from '../../../test/__mocks__/tutorials';

describe('tutorials slice', () => {
    const initialState: Tutorials = initial;

    describe('tutorials slice > actions', () => {
        test('fetchTutorials', () => {
            const expectedAction = {
                type: '[core] tutorials/fetch <fulfilled>',
                payload: tutorialsData
            };
            expect(fetchTutorials.fulfilled(tutorialsData)).toEqual(expectedAction);
        });
    });

    describe('tutorials slice > reducer', () => {
        describe('tutorials slice > reducer > tutorialsResult', () => {
            test('initial state', () => {
                expect(reducer(undefined, { type: 'action' })).toEqual(initialState);
            });
            test('fetchTutorials pending action', () => {
                const action = fetchTutorials.pending(true);
                expect(reducer(undefined, action)).toEqual(withNoDataWithPending);
            });
            test('fetchTutorials fulfilled action', () => {
                const action = fetchTutorials.fulfilled(tutorialsData);
                expect(reducer(undefined, action)).toEqual(withDataNoErrorNoTags);
            });
            test('fetchTutorials rejected action', () => {
                const action = fetchTutorials.rejected('no internet');
                expect(reducer(undefined, action)).toEqual(withNoDataWithError);
            });
        });

        describe('tutorials slice > reducer > tutorialsQuery', () => {
            test('tutorials page changed action', () => {
                const state = Object.assign({}, initialState, {
                    query: {
                        ...initialState.query,
                        start: 1
                    }
                });
                expect(reducer(initialState, tutorialsPageChanged(1))).toEqual(state);
            });
        });
    });
});
