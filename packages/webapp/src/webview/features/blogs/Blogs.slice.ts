import { createSlice, combineReducers } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { BlogFiltersEntryType, fetchBlogs, BLOGS_LIMIT_PER_PAGE } from '@sap/knowledge-hub-extension-types';
import type {
    Blogs,
    BlogsState,
    BlogsSearchQuery,
    BlogsSearchResult,
    BlogsSearchResultContentItem,
    BlogsUiState,
    BlogFiltersEntry,
    Tag,
    Error,
    ErrorAction,
    PendingAction
} from '@sap/knowledge-hub-extension-types';

import {
    blogsPageChanged,
    blogsManagedTagsAdd,
    blogsManagedTagsDelete,
    blogsManagedTagsDeleteAll,
    blogsTagsAdd,
    blogsLanguageUpdate,
    blogsCategoryAdd,
    blogsCategoryDelete,
    blogsCategoryDeleteAll,
    blogsFiltersSelected,
    blogsLoading,
    blogsFilterEntryAdd,
    blogsFilterEntryDelete,
    blogsFilterEntryDeleteAll,
    blogsSearchTermChanged
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

export const initialQueryState: BlogsSearchQuery = {
    page: 0,
    limit: BLOGS_LIMIT_PER_PAGE,
    orderBy: 'UPDATE_TIME',
    order: 'DESC',
    contentTypes: ['blogpost'],
    managedTags: [] as string[],
    searchTerm: '',
    questionType: '',
    language: '',
    blogCategories: [] as string[],
    authorId: '',
    userTags: '',
    updatedFrom: undefined,
    updatedTo: undefined,
    createdFrom: undefined,
    createdTo: undefined,
    boostingStrategy: '',
    additionalManagedTags: [] as string[],
    additionalUserTags: [] as string[]
};

export const initialUiState: BlogsUiState = {
    isLoading: false,
    isFiltersMenuOpened: false,
    filtersEntries: []
};

export const initialTagsState: Tag[] = [];

// Slices

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

const query = createSlice({
    name: 'blogsQuery',
    initialState: initialQueryState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addMatcher(blogsPageChanged.match, (state: BlogsSearchQuery, action: PayloadAction<number>): void => {
                state.page = action.payload;
            })
            .addMatcher(blogsManagedTagsAdd.match, (state: BlogsSearchQuery, action: PayloadAction<string>): void => {
                const currentTags: string[] = Object.assign([], state.managedTags);
                const newTag = action.payload;

                if (currentTags.length > 0) {
                    if (!currentTags.find((element: string) => element === newTag)) {
                        currentTags.push(newTag);
                    }
                } else {
                    currentTags.push(newTag);
                }
                state.managedTags = currentTags;
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
            .addMatcher(
                blogsLanguageUpdate.match,
                (state: BlogsSearchQuery, action: PayloadAction<string | null>): void => {
                    state.language = action.payload;
                }
            )
            .addMatcher(blogsCategoryAdd.match, (state: BlogsSearchQuery, action: PayloadAction<string>): void => {
                const currentBlogsCaterories: string[] = Object.assign([], state.blogCategories);
                const newCategory = action.payload;

                if (currentBlogsCaterories.length > 0) {
                    if (!currentBlogsCaterories.find((element: string) => element === newCategory)) {
                        currentBlogsCaterories.push(newCategory);
                    }
                } else {
                    currentBlogsCaterories.push(newCategory);
                }

                state.blogCategories = currentBlogsCaterories;
            })
            .addMatcher(blogsCategoryDelete.match, (state: BlogsSearchQuery, action: PayloadAction<string>): void => {
                const currentBlogsCaterories: string[] = Object.assign([], state.blogCategories);
                const oldCategory = action.payload;

                if (currentBlogsCaterories.length > 0) {
                    const newCategories = currentBlogsCaterories.filter((element: string) => element !== oldCategory);
                    state.blogCategories = newCategories;
                }
            })
            .addMatcher(blogsCategoryDeleteAll.match, (state: BlogsSearchQuery): void => {
                state.blogCategories = [];
            })
            .addMatcher(
                blogsSearchTermChanged.match,
                (state: BlogsSearchQuery, action: PayloadAction<string>): void => {
                    state.searchTerm = action.payload;
                }
            )
});

const ui = createSlice({
    name: 'blogsUI',
    initialState: initialUiState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addMatcher(blogsFiltersSelected.match, (state: BlogsUiState, action: PayloadAction<boolean>): void => {
                const isOpened = action.payload;
                state.isFiltersMenuOpened = isOpened;
            })
            .addMatcher(blogsLoading.match, (state: BlogsUiState, action: PayloadAction<boolean>): void => {
                const isLoading = action.payload;
                state.isLoading = isLoading;
            })
            .addMatcher(
                blogsFilterEntryAdd.match,
                (state: BlogsUiState, action: PayloadAction<BlogFiltersEntry>): void => {
                    const currentFilters = state.filtersEntries;
                    const newFilter = action.payload;

                    if (currentFilters.length > 0) {
                        if (newFilter.type === BlogFiltersEntryType.LANGUAGE) {
                            const index = currentFilters.findIndex(
                                (element: BlogFiltersEntry) => element.type === BlogFiltersEntryType.LANGUAGE
                            );
                            if (index !== -1) {
                                currentFilters[index].id = newFilter.id;
                                currentFilters[index].label = newFilter.label;
                                state.filtersEntries = currentFilters;
                            } else {
                                currentFilters.push(newFilter);
                                state.filtersEntries = currentFilters;
                            }
                        } else if (!currentFilters.find((element: BlogFiltersEntry) => element.id === newFilter.id)) {
                            currentFilters.push(newFilter);
                            state.filtersEntries = currentFilters;
                        }
                    } else {
                        state.filtersEntries = [newFilter];
                    }
                }
            )
            .addMatcher(blogsFilterEntryDelete.match, (state: BlogsUiState, action: PayloadAction<string>): void => {
                const currentFilters = state.filtersEntries;

                if (currentFilters.length > 0) {
                    const newFilter = currentFilters.filter(
                        (element: BlogFiltersEntry) => element.id !== action.payload
                    );
                    state.filtersEntries = newFilter;
                }
            })
            .addMatcher(blogsFilterEntryDeleteAll.match, (state: BlogsUiState): void => {
                state.filtersEntries = [];
            })
});

const tags = createSlice({
    name: 'blogsTags',
    initialState: initialTagsState,
    reducers: {},
    extraReducers: (builder) =>
        builder.addMatcher(blogsTagsAdd.match, (state: Tag[], action: PayloadAction<Tag>): void => {
            const found = state.find((element: Tag) => element.guid === action.payload.guid);
            if (!found) {
                state.push(action.payload);
            }
        })
});

export const initialState: Blogs = {
    result: initialSearchState,
    query: initialQueryState,
    ui: initialUiState,
    tags: initialTagsState
};

// State selectors
export const getBlogs = (state: RootState) => state.blogs.result;
export const getBlogsError = (state: RootState) => state.blogs.result.error;
export const getBlogsQuery = (state: RootState) => state.blogs.query;
export const getBlogsUI = (state: RootState) => state.blogs.ui;
export const getBlogsUIIsLoading = (state: RootState) => state.blogs.ui.isLoading;
export const getBlogsUIFiltersEntries = (state: RootState) => state.blogs.ui.filtersEntries;
export const getManagedTags = (state: RootState) => state.blogs.query.managedTags;
export const getBlogsLanguage = (state: RootState) => state.blogs.query.language || '';
export const getBlogsCategories = (state: RootState) => state.blogs.query.blogCategories;
export const getBlogsTags = (state: RootState) => state.blogs.tags;
export const getBlogsSearchTerm = (state: RootState) => state.blogs.query.searchTerm;

export default combineReducers({ result: result.reducer, query: query.reducer, ui: ui.reducer, tags: tags.reducer });
