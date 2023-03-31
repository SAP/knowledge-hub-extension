import { fetchTags } from '@sap/knowledge-hub-extension-types';
import reducer from '../../../src/webview/features/tags/Tags.slice';
import { getTags, getTagsData, getTagsPending, getTagsError } from '../../../src/webview/features/tags/Tags.slice';
import {
    tagsInitialState,
    tagsWithTags,
    withNoDataWithPending,
    withNoDataWithError
} from '../../../test/__mocks__/tags';
import { rootState } from '../../../test/__mocks__/store.mock';

describe('tags slice', () => {
    describe('tags slice > actions', () => {
        test('fetchTags', () => {
            const expectedAction = {
                type: '[core] tags/fetch <fulfilled>',
                payload: tagsWithTags.result.data
            };
            expect(fetchTags.fulfilled(tagsWithTags.result.data)).toEqual(expectedAction);
        });
    });

    describe('tags slice > reducer', () => {
        describe('tags slice > reducer > tagsResult', () => {
            test('initial state', () => {
                expect(reducer(undefined, { type: 'action' })).toEqual(tagsInitialState);
            });
            test('fetchTags pending action', () => {
                const action = fetchTags.pending(true);
                expect(reducer(undefined, action)).toEqual(withNoDataWithPending);
            });
            test('fetchTags fulfilled action', () => {
                const action = fetchTags.fulfilled(tagsWithTags.result.data);
                expect(reducer(undefined, action)).toEqual(tagsWithTags);
            });
            test('fetchTags rejected action', () => {
                const action = fetchTags.rejected('no internet');
                expect(reducer(undefined, action)).toEqual(withNoDataWithError);
            });
        });
    });

    describe('tags slice > state selector', () => {
        test('getTags', () => {
            expect(getTags(rootState)).toEqual(tagsInitialState.result);
        });
        test('getTagsData', () => {
            expect(getTagsData(rootState)).toEqual(tagsInitialState.result.data.filteredTags);
        });
        test('getTagsPending', () => {
            expect(getTagsPending(rootState)).toEqual(tagsInitialState.result.pending);
        });
        test('getTagsError', () => {
            expect(getTagsError(rootState)).toEqual(tagsInitialState.result.error);
        });
    });
});
