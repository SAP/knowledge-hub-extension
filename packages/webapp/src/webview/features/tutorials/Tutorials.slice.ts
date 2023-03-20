import { createSlice, combineReducers } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchTutorials, fetchHomeTutorials, TUTORIALS_LIMIT_PER_PAGE } from '@sap/knowledge-hub-extension-types';
import type {
    Tutorials,
    TutorialsTags,
    TutorialsState,
    TutorialsSearchResult,
    TutorialsSearchQuery,
    TutorialsUiState,
    TutorialsTagsState,
    Error,
    ErrorAction,
    PendingAction
} from '@sap/knowledge-hub-extension-types';
import {
    tutorialsPageChanged,
    tutorialsFiltersTagsAdd,
    tutorialsFiltersTagsDelete,
    tutorialsFiltersTagsDeleteAll,
    tutorialsFiltersSelected
} from '../../store/actions';
import type { RootState } from '../../store';

export const initialSearchState: TutorialsState = {
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
    error: {
        isError: false,
        message: ''
    },
    pending: false
};

export const initialQueryState: TutorialsSearchQuery = {
    rows: TUTORIALS_LIMIT_PER_PAGE,
    start: 0,
    searchField: '',
    pagePath: '/content/developers/website/languages/en/tutorial-navigator',
    language: 'en_us',
    addDefaultLanguage: true,
    filters: []
};

export const initialUiState: TutorialsUiState = {
    isFiltersMenuOpened: false
};

export const initialTagsState: TutorialsTagsState = {
    tags: {}
};

// Slice
const result = createSlice({
    name: 'tutorialsResult',
    initialState: initialSearchState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(
            fetchTutorials.pending.type,
            (state: TutorialsState, action: PendingAction<string, undefined>) => {
                const pending = action.pending;
                return { ...state, pending };
            }
        );

        builder.addCase(
            fetchTutorials.fulfilled.type,
            (state: TutorialsState, action: PayloadAction<TutorialsSearchResult>) => {
                const data: TutorialsSearchResult = action.payload;
                const error: Error = { isError: false, message: '' };
                const pending = false;

                return { ...state, data, error, pending };
            }
        );

        builder.addCase(
            fetchTutorials.rejected.type,
            (state: TutorialsState, action: ErrorAction<string, undefined>) => {
                const pending = false;
                const error: Error = { isError: true, message: action.error.message };

                return { ...state, error, pending };
            }
        );
    }
});

const query = createSlice({
    name: 'tutorialsQuery',
    initialState: initialQueryState,
    reducers: {},
    extraReducers: (builder) =>
        builder
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
});

const ui = createSlice({
    name: 'tutorialsUI',
    initialState: initialUiState,
    reducers: {},
    extraReducers: (builder) =>
        builder.addMatcher(
            tutorialsFiltersSelected.match,
            (state: TutorialsUiState, action: PayloadAction<boolean>): void => {
                const isOpened = action.payload;
                state.isFiltersMenuOpened = isOpened;
            }
        )
});

const tags = createSlice({
    name: 'tutorialsTags',
    initialState: initialTagsState,
    reducers: {},
    extraReducers: (builder) =>
        builder.addCase(fetchHomeTutorials.fulfilled.type, (state, action: PayloadAction<TutorialsSearchResult>) => {
            const data: TutorialsSearchResult = action.payload;
            const tags: TutorialsTags = data.tags;

            return { ...state, tags };
        })
});

export const initialState: Tutorials = {
    result: initialSearchState,
    query: initialQueryState,
    ui: initialUiState,
    tags: initialTagsState
};

// State selectors
export const getTutorials = (state: RootState) => state.tutorials.result;
export const getTutorialsData = (state: RootState) => state.tutorials.result.data;
export const getTutorialsPending = (state: RootState) => state.tutorials.result.pending;
export const getTutorialsError = (state: RootState) => state.tutorials.result.error;
export const getTutorialsQuery = (state: RootState) => state.tutorials.query;
export const getTutorialsQueryFilters = (state: RootState) => state.tutorials.query.filters;
export const getTutorialsUI = (state: RootState) => state.tutorials.ui;
export const getTutorialsDataTags = (state: RootState) => state.tutorials.tags.tags;

export default combineReducers({ result: result.reducer, query: query.reducer, ui: ui.reducer, tags: tags.reducer });
