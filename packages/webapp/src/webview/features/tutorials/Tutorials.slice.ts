import { createSlice, combineReducers } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { initialize, fetchTutorials, TUTORIALS_LIMIT_PER_PAGE } from '@sap/knowledge-hub-extension-types';
import type {
    AppState,
    Tutorials,
    TutorialsState,
    TutorialsSearchResultData,
    TutorialsSearchResult,
    TutorialsSearchQuery,
    TutorialsUiState,
    TutorialsTagWithTitle,
    Error,
    ErrorAction,
    PendingAction
} from '@sap/knowledge-hub-extension-types';
import {
    tutorialsPageChanged,
    tutorialsFiltersTagsAdd,
    tutorialsFiltersTagsDelete,
    tutorialsFiltersTagsDeleteAll,
    tutorialsFiltersTagsResetWith,
    tutorialsFiltersSelected,
    tutorialsSearchFieldChanged,
    tutorialsLoading
} from '../../store/actions';

import type { RootState } from '../../store';

export const initialTutorialsQueryState: TutorialsSearchQuery = {
    rows: TUTORIALS_LIMIT_PER_PAGE,
    start: 0,
    searchField: '',
    pagePath: '/content/developers/website/languages/en/tutorial-navigator',
    language: 'en_us',
    addDefaultLanguage: true,
    filters: []
};

export const initialSearchState: TutorialsState = {
    result: {
        data: {
            group: '',
            mission: '',
            facets: {},
            iconPath: {},
            tags: {},
            tutorialsNewFrom: new Date(new Date().toISOString().split('T')[0]),
            result: [],
            numFound: -1,
            countGroups: 0,
            countMissions: 0,
            countTutorials: 0
        },
        query: initialTutorialsQueryState
    },
    error: {
        isError: false,
        message: ''
    },
    pending: false
};

export const initialUiState: TutorialsUiState = {
    isLoading: false,
    isFiltersMenuOpened: false
};

// Slice
const result = createSlice({
    name: 'tutorialsResult',
    initialState: initialSearchState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchTutorials.pending.type, (state: TutorialsState, action: PendingAction<string, undefined>) => {
                const pending = action.pending;
                return { ...state, pending };
            })
            .addCase(
                fetchTutorials.fulfilled.type,
                (state: TutorialsState, action: PayloadAction<TutorialsSearchResult>) => {
                    const query: TutorialsSearchQuery = action.payload.query;
                    const data: TutorialsSearchResultData = action.payload.data;
                    const pending = false;
                    const error: Error = { isError: false, message: '' };
                    return { ...state, result: { data, query }, error, pending };
                }
            )
            .addCase(fetchTutorials.rejected.type, (state: TutorialsState, action: ErrorAction<string, undefined>) => {
                const pending = false;
                const error: Error = { isError: true, message: action.error.message };

                return { ...state, error, pending };
            });
    }
});

const query = createSlice({
    name: 'tutorialsQuery',
    initialState: initialTutorialsQueryState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addCase(initialize.fulfilled.type, (state: TutorialsSearchQuery, action: PayloadAction<AppState>) => {
                const initFilters = action.payload.appFilters;
                const filters: string[] = [];
                initFilters.tutorials?.forEach((tagWithTitle: TutorialsTagWithTitle) => {
                    filters.push(tagWithTitle.tag);
                });

                return { ...state, filters };
            })
            .addMatcher(
                tutorialsPageChanged.match,
                (state: TutorialsSearchQuery, action: PayloadAction<number>): void => {
                    state.start = action.payload;
                }
            )
            .addMatcher(
                tutorialsFiltersTagsAdd.match,
                (state: TutorialsSearchQuery, action: PayloadAction<string>): void => {
                    const currentFilters = state.filters;
                    const newFilter = action.payload;

                    if (currentFilters && currentFilters.length > 0) {
                        if (!currentFilters.find((element: string) => element === newFilter)) {
                            currentFilters.push(newFilter);
                            state.filters = currentFilters;
                        }
                    } else {
                        state.filters = [newFilter];
                    }
                }
            )
            .addMatcher(
                tutorialsFiltersTagsResetWith.match,
                (state: TutorialsSearchQuery, action: PayloadAction<string>): void => {
                    const newFilter = action.payload;
                    state.filters = [newFilter];
                }
            )
            .addMatcher(
                tutorialsFiltersTagsDelete.match,
                (state: TutorialsSearchQuery, action: PayloadAction<string>): void => {
                    const currentFilters = state.filters;
                    const oldFilter = action.payload;

                    if (currentFilters && currentFilters.length > 0) {
                        const newFilters = currentFilters.filter((element: string) => element !== oldFilter);
                        state.filters = newFilters;
                    }
                }
            )
            .addMatcher(tutorialsFiltersTagsDeleteAll.match, (state: TutorialsSearchQuery): void => {
                state.filters = [];
            })
            .addMatcher(
                tutorialsSearchFieldChanged.match,
                (state: TutorialsSearchQuery, action: PayloadAction<string>): void => {
                    state.start = 0;
                    state.searchField = action.payload;
                }
            )
});

const ui = createSlice({
    name: 'tutorialsUI',
    initialState: initialUiState,
    reducers: {},
    extraReducers: (builder) =>
        builder
            .addMatcher(tutorialsLoading.match, (state: TutorialsUiState, action: PayloadAction<boolean>): void => {
                const isLoading = action.payload;
                state.isLoading = isLoading;
            })
            .addMatcher(
                tutorialsFiltersSelected.match,
                (state: TutorialsUiState, action: PayloadAction<boolean>): void => {
                    const isOpened = action.payload;
                    state.isFiltersMenuOpened = isOpened;
                }
            )
});

export const initialState: Tutorials = {
    result: initialSearchState,
    query: initialTutorialsQueryState,
    ui: initialUiState
};

// State selectors
export const getTutorials = (state: RootState) => state.tutorials.result;
export const getTutorialsData = (state: RootState) => state.tutorials.result.result.data;
export const getTutorialsTotalCount = (state: RootState) => state.tutorials.result.result.data.numFound;
export const getTutorialsPending = (state: RootState) => state.tutorials.result.pending;
export const getTutorialsError = (state: RootState) => state.tutorials.result.error;

export const getTutorialsQuery = (state: RootState) => state.tutorials.query;
export const getTutorialsQueryFilters = (state: RootState) => state.tutorials.query.filters;

export const getTutorialsUI = (state: RootState) => state.tutorials.ui;
export const getTutorialsUIIsLoading = (state: RootState) => state.tutorials.ui.isLoading;

export default combineReducers({ result: result.reducer, query: query.reducer, ui: ui.reducer });
