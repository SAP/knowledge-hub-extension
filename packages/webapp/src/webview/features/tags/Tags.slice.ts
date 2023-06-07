import { createSlice, combineReducers } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchBlogsTags, fetchTutorialsTags } from '@sap/knowledge-hub-extension-types';
import type {
    Tags,
    BlogsTagsState,
    BlogsTagsSearchResult,
    TutorialsTagsState,
    TutorialsSearchResultData,
    TutorialsTags,
    Error,
    ErrorAction,
    PendingAction
} from '@sap/knowledge-hub-extension-types';

import type { RootState } from '../../store';

export const initialBlogsTagsState: BlogsTagsState = {
    data: {
        filteredTags: []
    },
    error: {
        isError: false,
        message: ''
    },
    pending: false
};

export const initialTutorialsTagsState: TutorialsTagsState = {
    tags: {},
    error: {
        isError: false,
        message: ''
    },
    pending: false
};

// Slice

const blogsTags = createSlice({
    name: 'blogsTags',
    initialState: initialBlogsTagsState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogsTags.pending.type, (state: BlogsTagsState, action: PendingAction<string, undefined>) => {
                const pending = action.pending;
                return { ...state, pending };
            })
            .addCase(
                fetchBlogsTags.fulfilled.type,
                (state: BlogsTagsState, action: PayloadAction<BlogsTagsSearchResult>) => {
                    const data: BlogsTagsSearchResult = action.payload;
                    const error: Error = { isError: false, message: '' };
                    const pending = false;

                    return { ...state, data, error, pending };
                }
            )
            .addCase(fetchBlogsTags.rejected.type, (state: BlogsTagsState, action: ErrorAction<string, undefined>) => {
                const pending = false;
                const error: Error = { isError: true, message: action.error.message };

                return { ...state, error, pending };
            });
    }
});

const tutorialsTags = createSlice({
    name: 'tutorialsTags',
    initialState: initialTutorialsTagsState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(
                fetchTutorialsTags.pending.type,
                (state: TutorialsTagsState, action: PendingAction<string, undefined>) => {
                    const pending = action.pending;
                    return { ...state, pending };
                }
            )
            .addCase(
                fetchTutorialsTags.fulfilled.type,
                (state: TutorialsTagsState, action: PayloadAction<TutorialsSearchResultData>) => {
                    const tags: TutorialsTags = action.payload.tags;
                    const error: Error = { isError: false, message: '' };
                    const pending = false;

                    return { ...state, tags, error, pending };
                }
            )
            .addCase(
                fetchTutorialsTags.rejected.type,
                (state: TutorialsTagsState, action: ErrorAction<string, undefined>) => {
                    const pending = false;
                    const error: Error = { isError: true, message: action.error.message };

                    return { ...state, error, pending };
                }
            );
    }
});

export const initialState: Tags = {
    blogs: initialBlogsTagsState,
    tutorials: initialTutorialsTagsState
};

// State selectors
export const getTagsBlogs = (state: RootState) => state.tags.blogs;
export const getTagsBlogsData = (state: RootState) => state.tags.blogs.data.filteredTags;
export const getTagsBlogsPending = (state: RootState) => state.tags.blogs.pending;
export const getTagsBlogsError = (state: RootState) => state.tags.blogs.error;
export const getTagsTutorials = (state: RootState) => state.tags.tutorials;
export const getTagsTutorialsData = (state: RootState) => state.tags.tutorials.tags;
export const getTagsTutorialsPending = (state: RootState) => state.tags.tutorials.pending;
export const getTagsTutorialsError = (state: RootState) => state.tags.tutorials.error;

export default combineReducers({ blogs: blogsTags.reducer, tutorials: tutorialsTags.reducer });
