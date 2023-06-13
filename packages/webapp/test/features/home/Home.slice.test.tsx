import { fetchTutorials, fetchBlogs } from '@sap/knowledge-hub-extension-types';

import reducer from '../../../src/webview/features/home//Home.slice';

import {
    homeInitialState,
    stateTutorialsWithDataNoError,
    stateTutorialsWithNoDataWithError,
    stateTutorialsWithNoDataWithPending,
    stateBlogsWithNoDataWithPending,
    stateBlogsWithDataNoError,
    stateBlogsWithNoDataWithError,
    stateBlogsWithDataNoErrorWithSearch
} from '../../../test/__mocks__/home';
import { tutorialsDataFromFetch } from '../../../test/__mocks__/tutorials';
import { blogsData, blogsDataWithQuerySearch } from '../../../test/__mocks__/blogs';

describe('home slice', () => {
    describe('home slice > reducer', () => {
        test('initial state', () => {
            expect(reducer(undefined, { type: 'action' })).toEqual(homeInitialState);
        });

        describe('home slice > reducer > tutorials', () => {
            test('fetchHomeTutorials pending action', () => {
                const action = fetchTutorials.pending(true);
                expect(reducer(undefined, action)).toEqual(stateTutorialsWithNoDataWithPending);
            });
            test('fetchHomeTutorials fulfilled action', () => {
                const action = fetchTutorials.fulfilled(tutorialsDataFromFetch);
                expect(reducer(undefined, action)).toEqual(stateTutorialsWithDataNoError);
            });
            test('fetchHomeTutorials rejected action', () => {
                const action = fetchTutorials.rejected('no internet');
                expect(reducer(undefined, action)).toEqual(stateTutorialsWithNoDataWithError);
            });
        });

        describe('home slice > reducer > blogs', () => {
            test('fetchHomeBlogs pending action', () => {
                const action = fetchBlogs.pending(true);
                expect(reducer(undefined, action)).toEqual(stateBlogsWithNoDataWithPending);
            });
            describe('fetchHomeBlogs fulfilled action', () => {
                test('fetchHomeBlogs fulfilled action', () => {
                    const action = fetchBlogs.fulfilled(blogsData);
                    expect(reducer(undefined, action)).toEqual(stateBlogsWithDataNoError);
                });
                test('fetchHomeBlogs fulfilled action with searchTerm', () => {
                    const action = fetchBlogs.fulfilled(blogsDataWithQuerySearch);
                    expect(reducer(undefined, action)).toEqual(stateBlogsWithDataNoErrorWithSearch);
                });
            });
            test('fetchHomeBlogs rejected action', () => {
                const action = fetchBlogs.rejected('no internet');
                expect(reducer(undefined, action)).toEqual(stateBlogsWithNoDataWithError);
            });
        });
    });
});
