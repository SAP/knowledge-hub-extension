import { createSlice, combineReducers } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchBlogs, BLOGS_LIMIT_PER_PAGE } from '@sap/knowledge-hub-extension-types';
import type {
    Blogs,
    BlogsState,
    BlogsSearchQuery,
    BlogsSearchResult,
    BlogsSearchResultContentItem,
    BlogsManagedTag,
    Error,
    ErrorAction,
    PendingAction
} from '@sap/knowledge-hub-extension-types';

import {
    blogsPageChanged,
    blogsManagedTagsAdd,
    blogsManagedTagsDelete,
    blogsManagedTagsDeleteAll,
    blogsTagsAdd
} from '../../store/actions';
import type { RootState } from '../../store';

export const initialSearchState: BlogsState = {
    data: [],
    totalCount: -1,
    error: {
        isError: false,
        message: ''
    },
    pending: false
};

export const initialUIState: BlogsSearchQuery = {
    page: 0,
    limit: BLOGS_LIMIT_PER_PAGE,
    orderBy: 'UPDATE_TIME',
    order: 'DESC',
    contentTypes: ['blogpost'],
    managedTags: [],
    searchTerm: '',
    questionType: '',
    language: '',
    blogCategories: '',
    authorId: '',
    userTags: '',
    updatedFrom: undefined,
    updatedTo: undefined,
    createdFrom: undefined,
    createdTo: undefined,
    boostingStrategy: '',
    additionalManagedTags: [],
    additionalUserTags: []
};

export const initialTagsState: BlogsManagedTag[] = [];

const result = createSlice({
    name: 'blogsResult',
    initialState: initialSearchState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(fetchBlogs.pending.type, (state: BlogsState, action: PendingAction<string, undefined>) => {
            const pending = action.pending;
            return { ...state, pending };
        });

        builder.addCase(fetchBlogs.fulfilled.type, (state: BlogsState, action: PayloadAction<BlogsSearchResult>) => {
            const data: BlogsSearchResultContentItem[] = action.payload.contentItems;
            const totalCount = action.payload.totalCount;
            const pending = false;
            const error: Error = { isError: false, message: '' };

            return { ...state, data, totalCount, error, pending };
        });

        builder.addCase(fetchBlogs.rejected.type, (state: BlogsState, action: ErrorAction<string, undefined>) => {
            const pending = false;
            const error: Error = { isError: true, message: action.error.message };

            return { ...state, error, pending };
        });
    }
});

const ui = createSlice({
    name: 'blogsUi',
    initialState: initialUIState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addMatcher(blogsPageChanged.match, (state: BlogsSearchQuery, action: PayloadAction<number>): void => {
                state.page = action.payload;
            })
            .addMatcher(blogsManagedTagsAdd.match, (state: BlogsSearchQuery, action: PayloadAction<string>): void => {
                const currentTags = state.managedTags;
                const newTag = action.payload;

                if (currentTags && currentTags.length > 0) {
                    if (!currentTags.find((element: string) => element === newTag)) {
                        currentTags.push(newTag);
                        state.managedTags = currentTags;
                    }
                } else {
                    state.managedTags = [newTag];
                }
            })
            .addMatcher(
                blogsManagedTagsDelete.match,
                (state: BlogsSearchQuery, action: PayloadAction<string>): void => {
                    const currentTags = state.managedTags;
                    const oldTag = action.payload;

                    if (currentTags && currentTags.length > 0) {
                        const newTags = currentTags.filter((element: string) => element !== oldTag);
                        state.managedTags = newTags;
                    }
                }
            )
            .addMatcher(blogsManagedTagsDeleteAll.match, (state: BlogsSearchQuery): void => {
                state.managedTags = [];
            })
});

const tags = createSlice({
    name: 'blogsTags',
    initialState: initialTagsState,
    reducers: {},
    extraReducers: (builder) =>
        builder.addMatcher(
            blogsTagsAdd.match,
            (state: BlogsManagedTag[], action: PayloadAction<BlogsManagedTag>): void => {
                const found = state.find((element: BlogsManagedTag) => element.guid === action.payload.guid);
                if (!found) {
                    state.push(action.payload);
                }
            }
        )
});

export const initialState: Blogs = {
    result: initialSearchState,
    ui: initialUIState,
    tags: initialTagsState
};

// State selectors
export const getBlogs = (state: RootState) => state.blogs.result;
export const getBlogsError = (state: RootState) => state.blogs.result.error;
export const getBlogsUI = (state: RootState) => state.blogs.ui;
export const getManagedTags = (state: RootState) => state.blogs.ui.managedTags;
export const getBlogsTags = (state: RootState) => state.blogs.tags;

export default combineReducers({ result: result.reducer, ui: ui.reducer, tags: tags.reducer });
