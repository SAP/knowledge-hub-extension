import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { Search } from '@sap/knowledge-hub-extension-types';

import { searchTermChanged } from '../../store/actions';
import type { RootState } from '../../store';

export const initialState: Search = {
    term: ''
};

const search = createSlice({
    name: 'search',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder.addMatcher(searchTermChanged.match, (state, action: PayloadAction<string>): void => {
            state.term = action.payload;
        })
});

// State selectors
export const getSearchTerm = (state: RootState) => state.search.term;

export default search.reducer;
