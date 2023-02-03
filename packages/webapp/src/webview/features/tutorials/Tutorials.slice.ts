import { createSlice, combineReducers } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchTutorials, TUTORIALS_LIMIT_PER_PAGE } from '@sap/knowledge-hub-extension-types';
import type {
    Tutorials,
    TutorialsState,
    TutorialsSearchResult,
    Error,
    ErrorAction,
    PendingAction,
    TutorialsSearchQuery
} from '@sap/knowledge-hub-extension-types';
import { tutorialsPageChanged } from '../../store/actions';
import type { RootState } from '../../store';

export const initialSearchState: TutorialsState = {
    data: {
        group: '',
        mission: '',
        facets: {},
        iconPath: {},
        tags: {},
        tutorialsNewFrom: '',
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

export const initialUIState: TutorialsSearchQuery = {
    rows: TUTORIALS_LIMIT_PER_PAGE,
    start: 0,
    searchField: '',
    pagePath: '/content/developers/website/languages/en/tutorial-navigator',
    language: 'en_us',
    addDefaultLanguage: true,
    filters: []
};

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

const ui = createSlice({
    name: 'tutorialsUi',
    initialState: initialUIState,
    reducers: {},
    extraReducers: (builder) =>
        builder.addMatcher(tutorialsPageChanged.match, (state, action: PayloadAction<number>): void => {
            state.start = action.payload;
        })
});

export const initialState: Tutorials = {
    result: initialSearchState,
    ui: initialUIState
};

// State selectors
export const getTutorials = (state: RootState) => state.tutorials.result;
export const getTutorialsData = (state: RootState) => state.tutorials.result.data;
export const getTutorialsPending = (state: RootState) => state.tutorials.result.pending;
export const getTutorialsError = (state: RootState) => state.tutorials.result.error;
export const getTutorialsUI = (state: RootState) => state.tutorials.ui;

export const getTutorialsDataTags = (state: RootState) => state.tutorials.result.data.tags;

export default combineReducers({ result: result.reducer, ui: ui.reducer });
