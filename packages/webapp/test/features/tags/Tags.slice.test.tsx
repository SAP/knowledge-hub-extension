import { fetchBlogsTags, fetchTutorialsTags } from '@sap/knowledge-hub-extension-types';
import reducer from '../../../src/webview/features/tags/Tags.slice';
import {
    getTagsBlogs,
    getTagsBlogsData,
    getTagsBlogsPending,
    getTagsBlogsError,
    getTagsTutorials,
    getTagsTutorialsData,
    getTagsTutorialsPending,
    getTagsTutorialsError
} from '../../../src/webview/features/tags/Tags.slice';
import {
    tagsInitialState,
    blogsTagsWithTags,
    blogsTagsWithNoDataWithPending,
    blogsTagsWithNoDataWithError,
    tutorialsData,
    //tutorialsTagsWithNoDataWithPending,
    tutorialsTagsWithTags
    //tutorialsTagsWithNoDataWithError
} from '../../../test/__mocks__/tags';
import { rootState } from '../../../test/__mocks__/store.mock';

describe('tags slice', () => {
    describe('tags slice > actions', () => {
        test('fetchBlogsTags', () => {
            const expectedAction = {
                type: '[core] tags/fetch/blogs-tags <fulfilled>',
                payload: blogsTagsWithTags.blogs.data
            };
            expect(fetchBlogsTags.fulfilled(blogsTagsWithTags.blogs.data)).toEqual(expectedAction);
        });
        test('fetchTutorialsTags', () => {
            const expectedAction = {
                type: '[core] tags/fetch/tutorials-tags <fulfilled>',
                payload: tutorialsData
            };
            expect(fetchTutorialsTags.fulfilled(tutorialsData)).toEqual(expectedAction);
        });
    });

    describe('tags slice > reducer', () => {
        describe('tags slice > reducer > fetchBlogsTags', () => {
            test('initial state', () => {
                expect(reducer(undefined, { type: 'action' })).toEqual(tagsInitialState);
            });
            test('fetchBlogsTags pending action', () => {
                const action = fetchBlogsTags.pending(true);
                expect(reducer(undefined, action)).toEqual(blogsTagsWithNoDataWithPending);
            });
            test('fetchBlogsTags fulfilled action', () => {
                const action = fetchBlogsTags.fulfilled(blogsTagsWithTags.blogs.data);
                expect(reducer(undefined, action)).toEqual(blogsTagsWithTags);
            });
            test('fetchBlogsTags rejected action', () => {
                const action = fetchBlogsTags.rejected('no internet');
                expect(reducer(undefined, action)).toEqual(blogsTagsWithNoDataWithError);
            });
        });

        describe('tags slice > reducer > fetchTutorialsTags', () => {
            test('initial state', () => {
                expect(reducer(undefined, { type: 'action' })).toEqual(tagsInitialState);
            });
            // test('fetchTutorialsTags pending action', () => {
            //     const action = fetchTutorialsTags.pending(true);
            //     expect(reducer(undefined, action)).toEqual(tutorialsTagsWithNoDataWithPending);
            // });
            test('fetchTutorialsTags fulfilled action', () => {
                const action = fetchTutorialsTags.fulfilled(tutorialsData);
                expect(reducer(undefined, action)).toEqual(tutorialsTagsWithTags);
            });
            // test('fetchTutorialsTags rejected action', () => {
            //     const action = fetchTutorialsTags.rejected('no internet');
            //     expect(reducer(undefined, action)).toEqual(tutorialsTagsWithNoDataWithError);
            // });
        });
    });

    // describe('tags slice > state selector', () => {
    //     test('getTags', () => {
    //         expect(getTags(rootState)).toEqual(tagsInitialState.result);
    //     });
    //     test('getTagsData', () => {
    //         expect(getTagsData(rootState)).toEqual(tagsInitialState.result.data.filteredTags);
    //     });
    //     test('getTagsPending', () => {
    //         expect(getTagsPending(rootState)).toEqual(tagsInitialState.result.pending);
    //     });
    //     test('getTagsError', () => {
    //         expect(getTagsError(rootState)).toEqual(tagsInitialState.result.error);
    //     });
    // });
});
