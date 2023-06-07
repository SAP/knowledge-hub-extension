import { createSlice, combineReducers } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchBlogs, fetchTutorials } from '@sap/knowledge-hub-extension-types';
import type {
    Home,
    TutorialsState,
    TutorialsSearchResult,
    TutorialsSearchQuery,
    TutorialsSearchResultData,
    BlogsState,
    BlogsSearchResult,
    BlogsSearchQuery,
    BlogsSearchResultContentItem,
    Error,
    ErrorAction,
    PendingAction
} from '@sap/knowledge-hub-extension-types';

import { initialBlogsQueryState } from '../blogs/Blogs.slice';
import { initialTutorialsQueryState } from '../tutorials/Tutorials.slice';

import type { RootState } from '../../store';

export const initialState: Home = {
    tutorials: {
        result: {
            query: initialTutorialsQueryState,
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
            }
        },
        error: {
            isError: false,
            message: ''
        },
        pending: true
    },
    blogs: {
        result: {
            query: initialBlogsQueryState,
            totalCount: -1,
            contentItems: []
        },
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
                    const query: TutorialsSearchQuery = action.payload.query;
                    const startDefault = initialTutorialsQueryState.start;
                    if (startDefault === query.start) {
                        const data: TutorialsSearchResultData = action.payload.data;
                        const result: TutorialsSearchResult = { data, query };
                        const pending = false;
                        const error: Error = { isError: false, message: '' };

                        return { ...state, result, error, pending };
                    } else {
                        const pending = false;
                        return { ...state, pending };
                    }
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
                const query: BlogsSearchQuery = action.payload.query;
                const pageDefault = initialBlogsQueryState.page;
                if (pageDefault === query.page) {
                    const query: BlogsSearchQuery = action.payload.query;
                    const contentItems: BlogsSearchResultContentItem[] = action.payload.contentItems;
                    const totalCount = action.payload.totalCount;
                    const result: BlogsSearchResult = { query, contentItems, totalCount };
                    const pending = false;
                    const error: Error = { isError: false, message: '' };

                    return { ...state, result, error, pending };
                } else {
                    const pending = false;
                    return { ...state, pending };
                }
            })
            .addCase(fetchBlogs.rejected.type, (state: BlogsState, action: ErrorAction<string, undefined>) => {
                const pending = false;
                const error: Error = { isError: true, message: action.error.message };
                return { ...state, error, pending };
            });
    }
});

// State selectors
export const getHomeTutorials = (state: RootState): TutorialsSearchResult => state.home.tutorials.result;
export const getHomeTutorialsError = (state: RootState): Error => state.home.tutorials.error;
export const getHomeTutorialsPending = (state: RootState): boolean => state.home.tutorials.pending;

export const getHomeBlogs = (state: RootState): BlogsSearchResult => state.home.blogs.result;
export const getHomeBlogsError = (state: RootState): Error => state.home.blogs.error;
export const getHomeBlogsPending = (state: RootState): boolean => state.home.blogs.pending;

export default combineReducers({
    tutorials: tutorials.reducer,
    blogs: blogs.reducer
});
