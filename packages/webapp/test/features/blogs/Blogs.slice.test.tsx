import { initialize, fetchBlogs, BlogFiltersEntryType } from '@sap/knowledge-hub-extension-types';

import reducer, {
    getBlogsResult,
    getBlogsError,
    getBlogsQuery,
    getBlogsUI,
    getBlogsUIIsLoading,
    getBlogsUIFiltersEntries,
    getManagedTags,
    getBlogsLanguage,
    getBlogsCategories,
    getBlogsSearchTerm
} from '../../../src/webview/features/blogs/Blogs.slice';

import {
    blogsPageChanged,
    blogsManagedTagsAdd,
    blogsManagedTagsDelete,
    blogsManagedTagsDeleteAll,
    blogsLanguageUpdate,
    blogsCategoryAdd,
    blogsCategoryDelete,
    blogsCategoryDeleteAll,
    blogsFiltersSelected,
    blogsLoading,
    blogsFilterEntryAdd,
    blogsFilterEntryDelete,
    blogsFilterEntryDeleteAll,
    blogsSearchTermChanged
} from '../../../src/webview/store/actions';

import {
    blogsInitialState,
    blogsData,
    blogsWithDataNoError,
    blogsWithNoDataWithError,
    blogsInitialWithLoading
} from '../../../test/__mocks__/blogs';
import { rootState } from '../../__mocks__/store.mock';
import { appInitialState } from '../../__mocks__/app';

describe('blogs slice', () => {
    describe('blogs slice > actions', () => {
        test('fetchblogs', () => {
            const expectedAction = {
                type: '[core] blogs/fetch <fulfilled>',
                payload: blogsData
            };
            expect(fetchBlogs.fulfilled(blogsData)).toEqual(expectedAction);
        });

        test('initialize', () => {
            const expectedAction = {
                type: '[core] app/initialize <fulfilled>',
                payload: appInitialState.app
            };
            expect(initialize.fulfilled(appInitialState.app)).toEqual(expectedAction);
        });
    });

    describe('blogs slice > reducer', () => {
        describe('blogs slice > reducer > blogsResult', () => {
            test('initial state', () => {
                expect(reducer(undefined, { type: 'action' })).toEqual(blogsInitialState);
            });
            test('fetchblogs pending action', () => {
                const action = fetchBlogs.pending(true);
                expect(reducer(undefined, action)).toEqual(blogsInitialWithLoading);
            });
            test('fetchblogs fulfilled action', () => {
                const action = fetchBlogs.fulfilled(blogsData);
                expect(reducer(undefined, action)).toEqual(blogsWithDataNoError);
            });
            test('fetchblogs rejected action', () => {
                const action = fetchBlogs.rejected('no internet');
                expect(reducer(undefined, action)).toEqual(blogsWithNoDataWithError);
            });
        });

        describe('blogs slice > reducer > blogsQuery', () => {
            test('blogs query - initialize action', () => {
                const state = Object.assign({}, blogsInitialState, {
                    query: {
                        ...blogsInitialState.query,
                        language: 'en',
                        managedTags: ['1'],
                        blogCategories: ['1']
                    },
                    ui: {
                        ...blogsInitialState.ui,
                        filtersEntries: [
                            {
                                id: 'en',
                                label: 'english',
                                type: 'LANGUAGE'
                            },
                            {
                                id: '1',
                                label: 'Cat 1',
                                type: 'CATEGORY'
                            },
                            {
                                id: '1',
                                label: 'Tag 1',
                                type: 'TAG'
                            }
                        ]
                    }
                });
                expect(
                    reducer(
                        blogsInitialState,
                        initialize.fulfilled({
                            appId: '1',
                            appFilters: {
                                blogs: [
                                    {
                                        id: 'en',
                                        label: 'english',
                                        type: BlogFiltersEntryType.LANGUAGE
                                    },
                                    {
                                        id: '1',
                                        label: 'Cat 1',
                                        type: BlogFiltersEntryType.CATEGORY
                                    },
                                    {
                                        id: '1',
                                        label: 'Tag 1',
                                        type: BlogFiltersEntryType.TAG
                                    }
                                ]
                            }
                        })
                    )
                ).toEqual(state);
            });
            test('blogs query - blogs page changed action', () => {
                const state = Object.assign({}, blogsInitialState, {
                    query: {
                        ...blogsInitialState.query,
                        page: 1
                    }
                });
                expect(reducer(blogsInitialState, blogsPageChanged(1))).toEqual(state);
            });

            test('blogs query - blogsManagedTagsAdd - blogs add tags action - state no previous tags', () => {
                const state = Object.assign({}, blogsInitialState, {
                    query: {
                        ...blogsInitialState.query,
                        managedTags: ['testTag']
                    }
                });
                expect(reducer(blogsInitialState, blogsManagedTagsAdd('testTag'))).toEqual(state);
            });

            test('blogs query - blogsManagedTagsAdd - blogs add tags action - state with previous tags', () => {
                const state = Object.assign({}, blogsInitialState, {
                    query: {
                        ...blogsInitialState.query,
                        managedTags: ['testTag']
                    }
                });
                const newState = Object.assign({}, blogsInitialState, {
                    query: {
                        ...blogsInitialState.query,
                        managedTags: ['testTag', 'testTag1']
                    }
                });
                expect(reducer(state, blogsManagedTagsAdd('testTag1'))).toEqual(newState);
            });

            test('blogs query - blogsManagedTagsDelete - blogs delete tags action - state with previous tags', () => {
                const state = Object.assign({}, blogsInitialState, {
                    query: {
                        ...blogsInitialState.query,
                        managedTags: ['testTag', 'testTag1']
                    }
                });
                const newState = Object.assign({}, blogsInitialState, {
                    query: {
                        ...blogsInitialState.query,
                        managedTags: ['testTag1']
                    }
                });
                expect(reducer(state, blogsManagedTagsDelete('testTag'))).toEqual(newState);
            });

            test('blogs query - blogsManagedTagsDeleteAll - blogs delete all tags action - state with previous tags', () => {
                const state = Object.assign({}, blogsInitialState, {
                    query: {
                        ...blogsInitialState.query,
                        managedTags: ['testTag', 'testTag1']
                    }
                });
                const newState = Object.assign({}, blogsInitialState, {
                    query: {
                        ...blogsInitialState.query,
                        managedTags: []
                    }
                });
                expect(reducer(state, blogsManagedTagsDeleteAll(null))).toEqual(newState);
            });

            test('blogs query - blogsLanguageUpdate - blogs update language action', () => {
                const uiInitialState = Object.assign({}, blogsInitialState);
                const state = Object.assign({}, blogsInitialState, {
                    query: {
                        ...blogsInitialState.query,
                        language: 'en'
                    }
                });
                expect(reducer(uiInitialState, blogsLanguageUpdate('en'))).toEqual(state);
            });

            test('blogs query - blogsCategoryAdd - blogs add category action - state no previous category', () => {
                const uiInitialState = Object.assign({}, blogsInitialState);
                const state = Object.assign({}, blogsInitialState, {
                    query: {
                        ...blogsInitialState.query,
                        blogCategories: ['tag1']
                    }
                });
                expect(reducer(uiInitialState, blogsCategoryAdd('tag1'))).toEqual(state);
            });

            test('blogs add category action - blogsCategoryAdd - state with previous category', () => {
                const uiInitialState = Object.assign({}, blogsInitialState, {
                    query: { ...blogsInitialState.query, blogCategories: ['tag1'] }
                });
                const state = Object.assign({}, blogsInitialState, {
                    query: {
                        ...blogsInitialState.query,
                        blogCategories: ['tag1', 'tag2']
                    }
                });
                expect(reducer(uiInitialState, blogsCategoryAdd('tag2'))).toEqual(state);
            });

            test('blogs delete category action - blogsCategoryDelete', () => {
                const uiInitialState = Object.assign({}, blogsInitialState, {
                    query: { ...blogsInitialState.query, blogCategories: ['tag1', 'tag2', 'tag3'] }
                });
                const state = Object.assign({}, blogsInitialState, {
                    query: {
                        ...blogsInitialState.query,
                        blogCategories: ['tag1', 'tag3']
                    }
                });
                expect(reducer(uiInitialState, blogsCategoryDelete('tag2'))).toEqual(state);
            });

            test('blogs delete all category action - blogsCategoryDeleteAll', () => {
                const uiInitialState = Object.assign({}, blogsInitialState, {
                    query: { ...blogsInitialState.query, blogCategories: ['tag1', 'tag2', 'tag3'] }
                });
                const state = Object.assign({}, blogsInitialState, {
                    query: {
                        ...blogsInitialState.query,
                        blogCategories: []
                    }
                });
                expect(reducer(uiInitialState, blogsCategoryDeleteAll(''))).toEqual(state);
            });

            test('blogs update search term action - blogsSearchTermChanged', () => {
                const uiInitialState = Object.assign({}, blogsInitialState, {
                    query: { ...blogsInitialState.query, searchTerm: '' }
                });
                const state = Object.assign({}, blogsInitialState, {
                    query: {
                        ...blogsInitialState.query,
                        searchTerm: 'test'
                    }
                });
                expect(reducer(uiInitialState, blogsSearchTermChanged('test'))).toEqual(state);
            });
        });

        describe('blogs slice > reducer > blogsUI', () => {
            test('blogs is filter menu opened - blogsFiltersSelected', () => {
                const state = Object.assign({}, blogsInitialState, {
                    ui: { isLoading: false, isFiltersMenuOpened: true, filtersEntries: [] }
                });
                expect(reducer(blogsInitialState, blogsFiltersSelected(true))).toEqual(state);
            });

            test('blogs is filter loading - blogsLoading', () => {
                const state = Object.assign({}, blogsInitialState, {
                    ui: { isLoading: true, isFiltersMenuOpened: false, filtersEntries: [] }
                });
                expect(reducer(blogsInitialState, blogsLoading(true))).toEqual(state);
            });

            describe('blogs add entry to filter - blogsFilterEntryAdd', () => {
                test('blogs add entry to filter - blogsFilterEntryAdd - filter not empty add a tag', () => {
                    const uiInitialState = Object.assign({}, blogsInitialState, {
                        ui: {
                            isLoading: false,
                            isFiltersMenuOpened: false,
                            filtersEntries: [
                                {
                                    id: 'tag1',
                                    label: 'Tag 1',
                                    type: BlogFiltersEntryType.TAG
                                },

                                {
                                    id: 'tag3',
                                    label: 'Tag 3',
                                    type: BlogFiltersEntryType.TAG
                                }
                            ]
                        }
                    });
                    const state = Object.assign({}, blogsInitialState, {
                        ui: {
                            isLoading: false,
                            isFiltersMenuOpened: false,
                            filtersEntries: [
                                {
                                    id: 'tag1',
                                    label: 'Tag 1',
                                    type: BlogFiltersEntryType.TAG
                                },
                                {
                                    id: 'tag3',
                                    label: 'Tag 3',
                                    type: BlogFiltersEntryType.TAG
                                },
                                {
                                    id: 'tag2',
                                    label: 'Tag 2',
                                    type: BlogFiltersEntryType.TAG
                                }
                            ]
                        }
                    });
                    expect(
                        reducer(
                            uiInitialState,
                            blogsFilterEntryAdd({
                                id: 'tag2',
                                label: 'Tag 2',
                                type: BlogFiltersEntryType.TAG
                            })
                        )
                    ).toEqual(state);
                });

                test('blogs add entry to filter - blogsFilterEntryAdd - filter empty add a tag', () => {
                    const uiInitialState = Object.assign({}, blogsInitialState, {
                        ui: {
                            isLoading: false,
                            isFiltersMenuOpened: false,
                            filtersEntries: []
                        }
                    });
                    const state = Object.assign({}, blogsInitialState, {
                        ui: {
                            isLoading: false,
                            isFiltersMenuOpened: false,
                            filtersEntries: [
                                {
                                    id: 'tag2',
                                    label: 'Tag 2',
                                    type: BlogFiltersEntryType.TAG
                                }
                            ]
                        }
                    });
                    expect(
                        reducer(
                            uiInitialState,
                            blogsFilterEntryAdd({
                                id: 'tag2',
                                label: 'Tag 2',
                                type: BlogFiltersEntryType.TAG
                            })
                        )
                    ).toEqual(state);
                });

                test('blogs add entry to filter - blogsFilterEntryAdd - filter not empty add a language', () => {
                    const uiInitialState = Object.assign({}, blogsInitialState, {
                        ui: {
                            isLoading: false,
                            isFiltersMenuOpened: false,
                            filtersEntries: [
                                {
                                    id: 'tag1',
                                    label: 'Tag 1',
                                    type: BlogFiltersEntryType.TAG
                                },
                                {
                                    id: 'tag2',
                                    label: 'Tag 2',
                                    type: BlogFiltersEntryType.LANGUAGE
                                },
                                {
                                    id: 'tag3',
                                    label: 'Tag 3',
                                    type: BlogFiltersEntryType.TAG
                                }
                            ]
                        }
                    });
                    const state = Object.assign({}, blogsInitialState, {
                        ui: {
                            isLoading: false,
                            isFiltersMenuOpened: false,
                            filtersEntries: [
                                {
                                    id: 'tag1',
                                    label: 'Tag 1',
                                    type: BlogFiltersEntryType.TAG
                                },
                                {
                                    id: 'tag4',
                                    label: 'Tag 4',
                                    type: BlogFiltersEntryType.LANGUAGE
                                },
                                {
                                    id: 'tag3',
                                    label: 'Tag 3',
                                    type: BlogFiltersEntryType.TAG
                                }
                            ]
                        }
                    });
                    expect(
                        reducer(
                            uiInitialState,
                            blogsFilterEntryAdd({
                                id: 'tag4',
                                label: 'Tag 4',
                                type: BlogFiltersEntryType.LANGUAGE
                            })
                        )
                    ).toEqual(state);
                });

                test('blogs add entry to filter - blogsFilterEntryAdd - filter empty add a language', () => {
                    const uiInitialState = Object.assign({}, blogsInitialState, {
                        ui: {
                            isLoading: false,
                            isFiltersMenuOpened: false,
                            filtersEntries: [
                                {
                                    id: 'tag1',
                                    label: 'Tag 1',
                                    type: BlogFiltersEntryType.TAG
                                }
                            ]
                        }
                    });
                    const state = Object.assign({}, blogsInitialState, {
                        ui: {
                            isLoading: false,
                            isFiltersMenuOpened: false,
                            filtersEntries: [
                                {
                                    id: 'tag1',
                                    label: 'Tag 1',
                                    type: BlogFiltersEntryType.TAG
                                },
                                {
                                    id: 'tag2',
                                    label: 'Tag 2',
                                    type: BlogFiltersEntryType.LANGUAGE
                                }
                            ]
                        }
                    });
                    expect(
                        reducer(
                            uiInitialState,
                            blogsFilterEntryAdd({
                                id: 'tag2',
                                label: 'Tag 2',
                                type: BlogFiltersEntryType.LANGUAGE
                            })
                        )
                    ).toEqual(state);
                });
            });
            test('blogs delete entry to filter - blogsFilterEntryDelete', () => {
                const uiInitialState = Object.assign({}, blogsInitialState, {
                    ui: {
                        isLoading: false,
                        isFiltersMenuOpened: false,
                        filtersEntries: [
                            {
                                id: 'tag1',
                                label: 'Tag 1',
                                type: BlogFiltersEntryType.TAG
                            },
                            {
                                id: 'tag2',
                                label: 'Tag 2',
                                type: BlogFiltersEntryType.TAG
                            },
                            {
                                id: 'tag3',
                                label: 'Tag 3',
                                type: BlogFiltersEntryType.TAG
                            }
                        ]
                    }
                });
                const state = Object.assign({}, blogsInitialState, {
                    ui: {
                        isLoading: false,
                        isFiltersMenuOpened: false,
                        filtersEntries: [
                            {
                                id: 'tag1',
                                label: 'Tag 1',
                                type: BlogFiltersEntryType.TAG
                            },
                            {
                                id: 'tag3',
                                label: 'Tag 3',
                                type: BlogFiltersEntryType.TAG
                            }
                        ]
                    }
                });
                expect(reducer(uiInitialState, blogsFilterEntryDelete('tag2'))).toEqual(state);
            });

            test('blogs delete all entries in filter- blogsFilterEntryDeleteAll', () => {
                const uiInitialState = Object.assign({}, blogsInitialState, {
                    ui: {
                        isLoading: false,
                        isFiltersMenuOpened: false,
                        filtersEntries: [
                            {
                                id: 'tag1',
                                label: 'Tag 1',
                                type: BlogFiltersEntryType.TAG
                            },
                            {
                                id: 'tag2',
                                label: 'Tag 2',
                                type: BlogFiltersEntryType.TAG
                            },
                            {
                                id: 'tag3',
                                label: 'Tag 3',
                                type: BlogFiltersEntryType.TAG
                            }
                        ]
                    }
                });
                const state = Object.assign({}, blogsInitialState, {
                    ui: { isLoading: false, isFiltersMenuOpened: false, filtersEntries: [] }
                });
                expect(reducer(uiInitialState, blogsFilterEntryDeleteAll(''))).toEqual(state);
            });
        });
    });

    describe('blogs slice > selectors', () => {
        test('getBlogsResult', () => {
            expect(getBlogsResult(rootState)).toEqual(blogsInitialState.result.result);
        });
        test('getBlogsError', () => {
            expect(getBlogsError(rootState)).toEqual(blogsInitialState.result.error);
        });
        test('getBlogsQuery', () => {
            expect(getBlogsQuery(rootState)).toEqual(blogsInitialState.query);
        });
        test('getBlogsUI', () => {
            expect(getBlogsUI(rootState)).toEqual(blogsInitialState.ui);
        });
        test('getBlogsUIIsLoading', () => {
            expect(getBlogsUIIsLoading(rootState)).toEqual(blogsInitialState.ui.isLoading);
        });
        test('getBlogsUIFiltersEntries', () => {
            expect(getBlogsUIFiltersEntries(rootState)).toEqual(blogsInitialState.ui.filtersEntries);
        });
        test('getManagedTags', () => {
            expect(getManagedTags(rootState)).toEqual(blogsInitialState.query.managedTags);
        });
        test('getBlogsLanguage', () => {
            expect(getBlogsLanguage(rootState)).toEqual(blogsInitialState.query.language || '');
        });
        test('getBlogsCategories', () => {
            expect(getBlogsCategories(rootState)).toEqual(blogsInitialState.query.blogCategories);
        });
        test('getBlogsSearchTerm', () => {
            expect(getBlogsSearchTerm(rootState)).toEqual(blogsInitialState.query.searchTerm);
        });
    });
});
