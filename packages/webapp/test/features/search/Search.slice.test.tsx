import type { Search } from '@sap/knowledge-hub-extension-types';
import reducer from '../../../src/webview/features/search/Search.slice';
import { searchTermChanged } from '../../../src/webview/store/actions';

describe('Search slice', () => {
    describe('Search slice > actions', () => {
        test('search term changed', () => {
            const expectedAction = {
                type: '[view] app/change-searchTerm',
                payload: 'term'
            };
            expect(searchTermChanged('term')).toEqual(expectedAction);
        });
    });

    describe('Search slice > reducer', () => {
        const initialState: Search = {
            term: ''
        };

        describe('Search slice > reducer > SearchResult', () => {
            const state = { term: 'test' };
            expect(reducer(initialState, searchTermChanged('test'))).toEqual(state);
        });
    });
});
