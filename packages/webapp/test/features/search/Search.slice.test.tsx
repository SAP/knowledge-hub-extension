import reducer from '../../../src/webview/features/search/Search.slice';
import { searchTermChanged } from '../../../src/webview/store/actions';

import { searchInitialState } from '../../__mocks__/search';

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
        describe('Search slice > reducer > SearchResult', () => {
            const state = { term: 'test' };
            expect(reducer(searchInitialState, searchTermChanged('test'))).toEqual(state);
        });
    });
});
