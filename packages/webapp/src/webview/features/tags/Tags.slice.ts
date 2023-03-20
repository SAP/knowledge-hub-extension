import { createSlice, combineReducers } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchTags } from '@sap/knowledge-hub-extension-types';
import type {
    Tags,
    TagsState,
    TagsSearchResult,
    Error,
    ErrorAction,
    PendingAction
} from '@sap/knowledge-hub-extension-types';

import type { RootState } from '../../store';

export const initialSearchState: TagsState = {
    data: {
        filteredTags: []
    },
    error: {
        isError: false,
        message: ''
    },
    pending: false
};

// Slice

const tags = createSlice({
    name: 'tagsResult',
    initialState: initialSearchState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(fetchTags.pending.type, (state: TagsState, action: PendingAction<string, undefined>) => {
            const pending = action.pending;
            return { ...state, pending };
        });

        builder.addCase(fetchTags.fulfilled.type, (state: TagsState, action: PayloadAction<TagsSearchResult>) => {
            const data: TagsSearchResult = action.payload;
            const error: Error = { isError: false, message: '' };
            const pending = false;

            return { ...state, data, error, pending };
        });

        builder.addCase(fetchTags.rejected.type, (state: TagsState, action: ErrorAction<string, undefined>) => {
            const pending = false;
            const error: Error = { isError: true, message: action.error.message };

            return { ...state, error, pending };
        });
    }
});

export const initialState: Tags = {
    result: initialSearchState
};

// State selectors
export const getTags = (state: RootState) => state.tags.result;
export const getTagsData = (state: RootState) => state.tags.result.data.filteredTags;
export const getTagsPending = (state: RootState) => state.tags.result.pending;
export const getTagsError = (state: RootState) => state.tags.result.error;

export default combineReducers({ result: tags.reducer });
