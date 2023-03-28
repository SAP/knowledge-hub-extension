import { fetchBlogs } from '@sap/knowledge-hub-extension-types';
import type { Blogs } from '@sap/knowledge-hub-extension-types';
import reducer from '../../../src/webview/features/blogs/Blogs.slice';
import {
    blogsPageChanged,
    blogsManagedTagsAdd,
    blogsManagedTagsDelete,
    blogsManagedTagsDeleteAll,
    blogsTagsAdd
} from '../../../src/webview/store/actions';

import {
    blogsInitialState,
    blogsData,
    withDataNoError,
    withNoDataWithError,
    initialWithPending
} from '../../../test/__mocks__/blogs';

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

        describe('blogs slice > reducer > blogsUi', () => {
            test('blogs page changed action', () => {
                const state = Object.assign({}, initialState, {
                    query: {
                        ...initialState.query,
                        page: 1
                    }
                });
                expect(reducer(initialState, blogsPageChanged(1))).toEqual(state);
            });

            test('blogs add tags action - state no previous tags', () => {
                const state = Object.assign({}, initialState, {
                    query: {
                        ...initialState.query,
                        managedTags: ['testTag']
                    }
                });
                expect(reducer(initialState, blogsManagedTagsAdd('testTag'))).toEqual(state);
            });

            test('blogs add tags action - state with previous tags', () => {
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

            test('blogs delete tags action - state with previous tags', () => {
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

            test('blogs delete all tags action - state with previous tags', () => {
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
    });
});
