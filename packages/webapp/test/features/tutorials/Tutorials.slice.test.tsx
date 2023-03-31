import { fetchTutorials, fetchHomeTutorials } from '@sap/knowledge-hub-extension-types';
import type { Tutorials } from '@sap/knowledge-hub-extension-types';
import reducer from '../../../src/webview/features/tutorials/Tutorials.slice';
import {
    tutorialsPageChanged,
    tutorialsFiltersTagsAdd,
    tutorialsFiltersTagsDelete,
    tutorialsFiltersTagsDeleteAll,
    tutorialsFiltersTagsResetWith,
    tutorialsLoading,
    tutorialsFiltersSelected
} from '../../../src/webview/store/actions';

import {
    getTutorials,
    getTutorialsData,
    getTutorialsPending,
    getTutorialsError,
    getTutorialsQuery,
    getTutorialsQueryFilters,
    getTutorialsUI,
    getTutorialsDataTags,
    getTutorialsUIIsLoading
} from '../../../src/webview/features/tutorials/Tutorials.slice';
import {
    tutorialsInitialState,
    tutorialsData,
    withDataNoErrorNoTags,
    withNoDataWithError,
    withNoDataWithPending
} from '../../../test/__mocks__/tutorials';
import { rootState } from '../../../test/__mocks__/store.mock';

describe('tutorials slice', () => {
    const initialState: Tutorials = tutorialsInitialState;

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

        describe('tutorials slice > reducer > tutorialsTags', () => {
            test('tutorials page changed action', () => {
                const state = Object.assign({}, initialState, {
                    tags: {
                        ...initialState.tags,
                        tags: {
                            'Tag 1': {
                                tagAlternativeTitles: [],
                                tagTitle: 'tutorial:experience/beginner',
                                title: 'Beginner'
                            },
                            'Tag 2': {
                                tagAlternativeTitles: [],
                                tagTitle: 'tutorial:type/group',
                                title: 'Group'
                            },
                            'Tag 3': {
                                tagAlternativeTitles: [],
                                tagTitle: 'Test tag',
                                title: 'Test tag'
                            }
                        }
                    }
                });
                const action = fetchHomeTutorials.fulfilled(tutorialsData);
                expect(reducer(undefined, action)).toEqual(state);
            });
        });
    });

    describe('tutorials slice > selectors', () => {
        test('getTutorials', () => {
            expect(getTutorials(rootState)).toEqual(tutorialsInitialState.result);
        });
        test('getTutorialsData', () => {
            expect(getTutorialsData(rootState)).toEqual(tutorialsInitialState.result.data);
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
        test('getTutorialsDataTags', () => {
            expect(getTutorialsDataTags(rootState)).toEqual(tutorialsInitialState.tags.tags);
        });
        test('getTutorialsUIIsLoading', () => {
            expect(getTutorialsUIIsLoading(rootState)).toEqual(tutorialsInitialState.ui.isLoading);
        });
    });
});
