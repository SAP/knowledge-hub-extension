import { createSlice, combineReducers } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchBlogs, fetchTutorials } from '@sap/knowledge-hub-extension-types';
import type {
    Home,
    TutorialsState,
    TutorialsSearchResult,
    BlogsState,
    BlogsSearchResult,
    BlogsSearchResultContentItem,
    Error,
    ErrorAction,
    PendingAction
} from '@sap/knowledge-hub-extension-types';

import type { RootState } from '../../store';

export const initialState: Home = {
    tutorials: {
        data: {
            group: '',
            mission: '',
            facets: {},
            iconPath: {},
            tags: {},
            tutorialsNewFrom: new Date(new Date().toISOString().split('T')[0]),
            result: [],
            numFound: 0,
            countGroups: 0,
            countMissions: 0,
            countTutorials: 0
        },
        error: {
            isError: false,
            message: ''
        },
        pending: true
    },
    blogs: {
        data: [],
        totalCount: 0,
        error: {
            isError: false,
            message: ''
        },
        pending: true
    }
};

const tutorials = createSlice({
    name: 'homeTutorials',
    initialState: initialState.tutorials,
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
                    const data: TutorialsSearchResult = action.payload;
                    const error: Error = { isError: false, message: '' };
                    const pending = false;
                    return { ...state, data, error, pending };
                }
            )
            .addCase(fetchTutorials.rejected.type, (state: TutorialsState, action: ErrorAction<string, undefined>) => {
                const pending = false;
                const error: Error = { isError: true, message: action.error.message };
                return { ...state, error, pending };
            });
    }
});

const blogs = createSlice({
    name: 'homeBlogs',
    initialState: initialState.blogs,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBlogs.pending.type, (state: BlogsState, action: PendingAction<string, undefined>) => {
                const pending = action.pending;
                return { ...state, pending };
            })
            .addCase(fetchBlogs.fulfilled.type, (state: BlogsState, action: PayloadAction<BlogsSearchResult>) => {
                const data: BlogsSearchResultContentItem[] = action.payload.contentItems;
                const totalCount = action.payload.totalCount;
                const pending = false;
                const error: Error = { isError: false, message: '' };
                return { ...state, data, totalCount, error, pending };
            })
            .addCase(fetchBlogs.rejected.type, (state: BlogsState, action: ErrorAction<string, undefined>) => {
                const pending = false;
                const error: Error = { isError: true, message: action.error.message };
                return { ...state, error, pending };
            });
    }
});

// State selectors
export const getHomeTutorials = (state: RootState) => state.home.tutorials;
export const getHomeTutorialsError = (state: RootState) => state.home.tutorials.error;
export const getHomeTutorialsPending = (state: RootState) => state.home.tutorials.pending;

export const getHomeBlogs = (state: RootState) => state.home.blogs;
export const getHomeBlogsError = (state: RootState) => state.home.blogs.error;
export const getHomeBlogsPending = (state: RootState) => state.home.blogs.pending;

export default combineReducers({
    tutorials: tutorials.reducer,
    blogs: blogs.reducer
});
