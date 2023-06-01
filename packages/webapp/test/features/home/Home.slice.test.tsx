import { fetchTutorials, fetchBlogs } from '@sap/knowledge-hub-extension-types';

import reducer from '../../../src/webview/features/home//Home.slice';

import {
    homeInitialState,
    tutorialsNoData,
    stateTutorialsWithDataNoError,
    stateTutorialsWithNoDataWithError,
    stateTutorialsWithNoDataWithPending,
    blogsNoData,
    stateBlogsWithNoDataWithPending,
    stateBlogsWithDataNoError,
    stateBlogsWithNoDataWithError
} from '../../../test/__mocks__/home';

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
                const action = fetchTutorials.fulfilled(tutorialsNoData);
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
            test('fetchHomeBlogs fulfilled action', () => {
                const action = fetchBlogs.fulfilled(blogsNoData);
                expect(reducer(undefined, action)).toEqual(stateBlogsWithDataNoError);
            });
            test('fetchHomeBlogs rejected action', () => {
                const action = fetchBlogs.rejected('no internet');
                expect(reducer(undefined, action)).toEqual(stateBlogsWithNoDataWithError);
            });
        });
    });
});
