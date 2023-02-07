import { fetchHomeTutorials, fetchHomeBlogs } from '@sap/knowledge-hub-extension-types';

import reducer from '../../../src/webview/features/home//Home.slice';

import {
    stateInitial,
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
            expect(reducer(undefined, { type: 'action' })).toEqual(stateInitial);
        });

        describe('home slice > reducer > tutorials', () => {
            test('fetchHomeTutorials pending action', () => {
                const action = fetchHomeTutorials.pending(true);
                expect(reducer(undefined, action)).toEqual(stateTutorialsWithNoDataWithPending);
            });
            test('fetchHomeTutorials fulfilled action', () => {
                const action = fetchHomeTutorials.fulfilled(tutorialsNoData);
                expect(reducer(undefined, action)).toEqual(stateTutorialsWithDataNoError);
            });
            test('fetchHomeTutorials rejected action', () => {
                const action = fetchHomeTutorials.rejected('no internet');
                expect(reducer(undefined, action)).toEqual(stateTutorialsWithNoDataWithError);
            });
        });

        describe('home slice > reducer > blogs', () => {
            test('fetchHomeBlogs pending action', () => {
                const action = fetchHomeBlogs.pending(true);
                expect(reducer(undefined, action)).toEqual(stateBlogsWithNoDataWithPending);
            });
            test('fetchHomeBlogs fulfilled action', () => {
                const action = fetchHomeBlogs.fulfilled(blogsNoData);
                expect(reducer(undefined, action)).toEqual(stateBlogsWithDataNoError);
            });
            test('fetchHomeBlogs rejected action', () => {
                const action = fetchHomeBlogs.rejected('no internet');
                expect(reducer(undefined, action)).toEqual(stateBlogsWithNoDataWithError);
            });
        });
    });
});
