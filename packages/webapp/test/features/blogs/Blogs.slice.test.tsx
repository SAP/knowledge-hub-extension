import { fetchBlogs, BlogFiltersEntryType } from '@sap/knowledge-hub-extension-types';
import type { Blogs } from '@sap/knowledge-hub-extension-types';
import reducer from '../../../src/webview/features/blogs/Blogs.slice';
import {
    getBlogs,
    getBlogsError,
    getBlogsQuery,
    getBlogsUI,
    getBlogsUIIsLoading,
    getBlogsUIFiltersEntries,
    getManagedTags,
    getBlogsLanguage,
    getBlogsCategories,
    getBlogsTags,
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
    blogsTagsAdd,
    blogsFiltersSelected,
    blogsLoading,
    blogsFilterEntryAdd,
    blogsFilterEntryDelete,
    blogsFilterEntryDeleteAll
} from '../../../src/webview/store/actions';

import {
    blogsInitialState,
    blogsData,
    withDataNoError,
    withNoDataWithError,
    initialWithPending
} from '../../../test/__mocks__/blogs';
import { rootState } from '../../../test/__mocks__/store.mock';

describe('blogs slice', () => {
    const initialState: Blogs = blogsInitialState;

    describe('blogs slice > actions', () => {
        test('fetchblogs', () => {
            const expectedAction = {
                type: '[core] blogs/fetch <fulfilled>',
                payload: blogsData
            };
            expect(fetchBlogs.fulfilled(blogsData)).toEqual(expectedAction);
        });
    });

    describe('blogs slice > reducer', () => {
        describe('blogs slice > reducer > blogsResult', () => {
            test('initial state', () => {
                expect(reducer(undefined, { type: 'action' })).toEqual(initialState);
            });
            test('fetchblogs pending action', () => {
                const action = fetchBlogs.pending(true);
                expect(reducer(undefined, action)).toEqual(initialWithPending);
            });
            test('fetchblogs fulfilled action', () => {
                const action = fetchBlogs.fulfilled(blogsData);
                expect(reducer(undefined, action)).toEqual(withDataNoError);
            });
            test('fetchblogs rejected action', () => {
                const action = fetchBlogs.rejected('no internet');
                expect(reducer(undefined, action)).toEqual(withNoDataWithError);
            });
        });

        describe('blogs slice > reducer > blogsQuery', () => {
            test('blogs page changed action', () => {
                const state = Object.assign({}, initialState, {
                    query: {
                        ...initialState.query,
                        page: 1
                    }
                });
                expect(reducer(initialState, blogsPageChanged(1))).toEqual(state);
            });

            test('blogs add tags action - blogsManagedTagsAdd - state no previous tags', () => {
                const state = Object.assign({}, initialState, {
                    query: {
                        ...initialState.query,
                        managedTags: ['testTag']
                    }
                });
                expect(reducer(initialState, blogsManagedTagsAdd('testTag'))).toEqual(state);
            });

            test('blogs add tags action - blogsManagedTagsAdd - state with previous tags', () => {
                const state = Object.assign({}, initialState, {
                    query: {
                        ...initialState.query,
                        managedTags: ['testTag']
                    }
                });
                const newState = Object.assign({}, initialState, {
                    query: {
                        ...initialState.query,
                        managedTags: ['testTag', 'testTag1']
                    }
                });
                expect(reducer(state, blogsManagedTagsAdd('testTag1'))).toEqual(newState);
            });

            test('blogs delete tags action - blogsManagedTagsDelete - state with previous tags', () => {
                const state = Object.assign({}, initialState, {
                    query: {
                        ...initialState.query,
                        managedTags: ['testTag', 'testTag1']
                    }
                });
                const newState = Object.assign({}, initialState, {
                    query: {
                        ...initialState.query,
                        managedTags: ['testTag1']
                    }
                });
                expect(reducer(state, blogsManagedTagsDelete('testTag'))).toEqual(newState);
            });

            test('blogs delete all tags action - blogsManagedTagsDeleteAll - state with previous tags', () => {
                const state = Object.assign({}, initialState, {
                    query: {
                        ...initialState.query,
                        managedTags: ['testTag', 'testTag1']
                    }
                });
                const newState = Object.assign({}, initialState, {
                    query: {
                        ...initialState.query,
                        managedTags: []
                    }
                });
                expect(reducer(state, blogsManagedTagsDeleteAll(null))).toEqual(newState);
            });

            test('blogs update language action - blogsLanguageUpdate', () => {
                const uiInitialState = Object.assign({}, initialState);
                const state = Object.assign({}, initialState, {
                    query: {
                        ...initialState.query,
                        language: 'en'
                    }
                });
                expect(reducer(uiInitialState, blogsLanguageUpdate('en'))).toEqual(state);
            });

            test('blogs add category action - blogsCategoryAdd - state no previous category', () => {
                const uiInitialState = Object.assign({}, initialState);
                const state = Object.assign({}, initialState, {
                    query: {
                        ...initialState.query,
                        blogCategories: ['tag1']
                    }
                });
                expect(reducer(uiInitialState, blogsCategoryAdd('tag1'))).toEqual(state);
            });

            test('blogs add category action - blogsCategoryAdd - state with previous category', () => {
                const uiInitialState = Object.assign({}, initialState, {
                    query: { ...initialState.query, blogCategories: ['tag1'] }
                });
                const state = Object.assign({}, initialState, {
                    query: {
                        ...initialState.query,
                        blogCategories: ['tag1', 'tag2']
                    }
                });
                expect(reducer(uiInitialState, blogsCategoryAdd('tag2'))).toEqual(state);
            });

            test('blogs delete category action - blogsCategoryDelete', () => {
                const uiInitialState = Object.assign({}, initialState, {
                    query: { ...initialState.query, blogCategories: ['tag1', 'tag2', 'tag3'] }
                });
                const state = Object.assign({}, initialState, {
                    query: {
                        ...initialState.query,
                        blogCategories: ['tag1', 'tag3']
                    }
                });
                expect(reducer(uiInitialState, blogsCategoryDelete('tag2'))).toEqual(state);
            });

            test('blogs delete all category action - blogsCategoryDeleteAll', () => {
                const uiInitialState = Object.assign({}, initialState, {
                    query: { ...initialState.query, blogCategories: ['tag1', 'tag2', 'tag3'] }
                });
                const state = Object.assign({}, initialState, {
                    query: {
                        ...initialState.query,
                        blogCategories: []
                    }
                });
                expect(reducer(uiInitialState, blogsCategoryDeleteAll(''))).toEqual(state);
            });

            test('blogs update search term action - blogsSearchTermChanged', () => {});
        });

        describe('blogs slice > reducer > blogsTags', () => {
            test('blogs add tags action - state with no tags', () => {
                const tags = [
                    {
                        displayName: 'Test',
                        guid: 'test'
                    }
                ];
                const state = Object.assign({}, initialState, {
                    tags: tags
                });
                expect(reducer(initialState, blogsTagsAdd(tags[0]))).toEqual(state);
            });

            test('blogs add tags action - state with some tags', () => {
                const state = Object.assign({}, initialState, {
                    tags: [
                        {
                            displayName: 'Test',
                            guid: 'test'
                        }
                    ]
                });
                const tags = [
                    {
                        displayName: 'Test1',
                        guid: 'test1'
                    }
                ];
                const newState = Object.assign({}, initialState, {
                    tags: [
                        {
                            displayName: 'Test',
                            guid: 'test'
                        },
                        {
                            displayName: 'Test1',
                            guid: 'test1'
                        }
                    ]
                });
                expect(reducer(state, blogsTagsAdd(tags[0]))).toEqual(newState);
            });
        });

        describe('blogs slice > reducer > blogsUI', () => {
            test('blogs is filter menu opened - blogsFiltersSelected', () => {
                const state = Object.assign({}, initialState, {
                    ui: { isLoading: false, isFiltersMenuOpened: true, filtersEntries: [] }
                });
                expect(reducer(initialState, blogsFiltersSelected(true))).toEqual(state);
            });

            test('blogs is filter loading - blogsLoading', () => {
                const state = Object.assign({}, initialState, {
                    ui: { isLoading: true, isFiltersMenuOpened: false, filtersEntries: [] }
                });
                expect(reducer(initialState, blogsLoading(true))).toEqual(state);
            });

            describe('blogs add entry to filter - blogsFilterEntryAdd', () => {
                test('blogs add entry to filter - blogsFilterEntryAdd - filter not empty add a tag', () => {
                    const uiInitialState = Object.assign({}, initialState, {
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
                    const state = Object.assign({}, initialState, {
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
                    const uiInitialState = Object.assign({}, initialState, {
                        ui: {
                            isLoading: false,
                            isFiltersMenuOpened: false,
                            filtersEntries: []
                        }
                    });
                    const state = Object.assign({}, initialState, {
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
                    const uiInitialState = Object.assign({}, initialState, {
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
                    const state = Object.assign({}, initialState, {
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
                    const uiInitialState = Object.assign({}, initialState, {
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
                    const state = Object.assign({}, initialState, {
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
                const uiInitialState = Object.assign({}, initialState, {
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
                const state = Object.assign({}, initialState, {
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
                const uiInitialState = Object.assign({}, initialState, {
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
                const state = Object.assign({}, initialState, {
                    ui: { isLoading: false, isFiltersMenuOpened: false, filtersEntries: [] }
                });
                expect(reducer(uiInitialState, blogsFilterEntryDeleteAll(''))).toEqual(state);
            });
        });
    });

    describe('blogs slice > selectors', () => {
        test('getBlogs', () => {
            expect(getBlogs(rootState)).toEqual(blogsInitialState.result);
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
        test('getBlogsTags', () => {
            expect(getBlogsTags(rootState)).toEqual(blogsInitialState.tags);
        });
        test('getBlogsSearchTerm', () => {
            expect(getBlogsSearchTerm(rootState)).toEqual(blogsInitialState.query.searchTerm);
        });
    });
});
