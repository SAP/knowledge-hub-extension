import { fetchTutorials } from '@sap/knowledge-hub-extension-types';
import type { Tutorials } from '@sap/knowledge-hub-extension-types';

import {
    tutorialsPageChanged,
    tutorialsFiltersTagsAdd,
    tutorialsFiltersTagsDelete,
    tutorialsFiltersTagsDeleteAll,
    tutorialsFiltersTagsResetWith,
    tutorialsLoading,
    tutorialsFiltersSelected
} from '../../../src/webview/store/actions';

import reducer, {
    getTutorials,
    getTutorialsData,
    getTutorialsPending,
    getTutorialsError,
    getTutorialsQuery,
    getTutorialsQueryFilters,
    getTutorialsUI,
    getTutorialsUIIsLoading
} from '../../../src/webview/features/tutorials/Tutorials.slice';
import {
    tutorialsInitialState,
    tutorialsDataFromFetch,
    tutorialsWithDataNoErrorNoTags,
    tutorialsWithNoDataWithError,
    tutorialsWithNoDataWithPending
} from '../../../test/__mocks__/tutorials';
import { rootState } from '../../../test/__mocks__/store.mock';

describe('tutorials slice', () => {
    const initialState: Tutorials = tutorialsInitialState;

    describe('tutorials slice > actions', () => {
        test('fetchTutorials', () => {
            const expectedAction = {
                type: '[core] tutorials/fetch <fulfilled>',
                payload: tutorialsDataFromFetch
            };
            expect(fetchTutorials.fulfilled(tutorialsDataFromFetch)).toEqual(expectedAction);
        });
    });

    describe('tutorials slice > reducer', () => {
        describe('tutorials slice > reducer > tutorialsResult', () => {
            test('initial state', () => {
                expect(reducer(undefined, { type: 'action' })).toEqual(initialState);
            });
            test('fetchTutorials pending action', () => {
                const action = fetchTutorials.pending(true);
                expect(reducer(undefined, action)).toEqual(tutorialsWithNoDataWithPending);
            });
            test('fetchTutorials fulfilled action', () => {
                const action = fetchTutorials.fulfilled(tutorialsDataFromFetch);
                expect(reducer(undefined, action)).toEqual(tutorialsWithDataNoErrorNoTags);
            });
            test('fetchTutorials rejected action', () => {
                const action = fetchTutorials.rejected('no internet');
                expect(reducer(undefined, action)).toEqual(tutorialsWithNoDataWithError);
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

            test('tutorials add tags action - tutorialsFiltersTagsAdd - state no previous tags', () => {
                const state = Object.assign({}, initialState, {
                    query: {
                        ...initialState.query,
                        filters: ['testTag']
                    }
                });

                expect(reducer(initialState, tutorialsFiltersTagsAdd('testTag'))).toEqual(state);
            });

            test('tutorials add tags action - tutorialsFiltersTagsAdd - state with previous tags', () => {
                const state = Object.assign({}, initialState, {
                    query: {
                        ...initialState.query,
                        filters: ['testTag']
                    }
                });
                const newState = Object.assign({}, initialState, {
                    query: {
                        ...initialState.query,
                        filters: ['testTag', 'testTag2']
                    }
                });
                expect(reducer(state, tutorialsFiltersTagsAdd('testTag2'))).toEqual(newState);
            });

            test('tutorials delete tags action - tutorialsFiltersTagsDelete - state with previous tags', () => {
                const state = Object.assign({}, initialState, {
                    query: {
                        ...initialState.query,
                        filters: ['testTag', 'testTag1']
                    }
                });
                const newState = Object.assign({}, initialState, {
                    query: {
                        ...initialState.query,
                        filters: ['testTag1']
                    }
                });
                expect(reducer(state, tutorialsFiltersTagsDelete('testTag'))).toEqual(newState);
            });

            test('tutorials delete tags action - tutorialsFiltersTagsResetWith - state with previous tags', () => {
                const state = Object.assign({}, initialState, {
                    query: {
                        ...initialState.query,
                        filters: ['testTag', 'testTag1', 'testTag2', 'testTag3', 'testTag4', 'testTag5']
                    }
                });
                const newState = Object.assign({}, initialState, {
                    query: {
                        ...initialState.query,
                        filters: ['testTag6']
                    }
                });
                expect(reducer(state, tutorialsFiltersTagsResetWith('testTag6'))).toEqual(newState);
            });

            test('tutorials delete all tags action - tutorialsFiltersTagsDeleteAll - state with previous tags', () => {
                const state = Object.assign({}, initialState, {
                    query: {
                        ...initialState.query,
                        filters: ['testTag', 'testTag1']
                    }
                });
                const newState = Object.assign({}, initialState, {
                    query: {
                        ...initialState.query,
                        filters: []
                    }
                });
                expect(reducer(state, tutorialsFiltersTagsDeleteAll(null))).toEqual(newState);
            });
        });

        describe('tutorials slice > reducer > tutorialsUI', () => {
            test('tutorials is filter menu opened - tutorialsFiltersSelected', () => {
                const state = Object.assign({}, initialState, {
                    ui: { isLoading: false, isFiltersMenuOpened: true }
                });
                expect(reducer(initialState, tutorialsFiltersSelected(true))).toEqual(state);
            });

            test('tutorials is loading - tutorialsLoading', () => {
                const state = Object.assign({}, initialState, {
                    ui: { isLoading: true, isFiltersMenuOpened: false }
                });
                expect(reducer(initialState, tutorialsLoading(true))).toEqual(state);
            });
        });
    });

    describe('tutorials slice > selectors', () => {
        test('getTutorials', () => {
            expect(getTutorials(rootState)).toEqual(tutorialsInitialState.result);
        });
        test('getTutorialsData', () => {
            expect(getTutorialsData(rootState)).toEqual(tutorialsInitialState.result.result.data);
        });
        test('getTutorialsPending', () => {
            expect(getTutorialsPending(rootState)).toEqual(tutorialsInitialState.result.pending);
        });
        test('getTutorialsError', () => {
            expect(getTutorialsError(rootState)).toEqual(tutorialsInitialState.result.error);
        });
        test('getTutorialsQuery', () => {
            expect(getTutorialsQuery(rootState)).toEqual(tutorialsInitialState.query);
        });
        test('getTutorialsQueryFilters', () => {
            expect(getTutorialsQueryFilters(rootState)).toEqual(tutorialsInitialState.query.filters);
        });
        test('getTutorialsUI', () => {
            expect(getTutorialsUI(rootState)).toEqual(tutorialsInitialState.ui);
        });
        test('getTutorialsUIIsLoading', () => {
            expect(getTutorialsUIIsLoading(rootState)).toEqual(tutorialsInitialState.ui.isLoading);
        });
    });
});
