import { createSlice, combineReducers } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchHomeTutorials, fetchHomeBlogs } from '@sap/knowledge-hub-extension-types';
import type {
    Home,
    TutorialsSearchResult,
    TutorialsSearchQuery,
    TutorialsTags,
    BlogsSearchResult,
    BlogsSearchQuery,
    BlogsSearchResultContentItem,
    BlogsManagedTag,
    Error,
    ErrorAction,
    PendingAction
} from '@sap/knowledge-hub-extension-types';

import type { RootState } from '../../store';

export const initialState: Home = {
    tutorials: {
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
        tags: {}
    },
    blogs: {
        blogs: {
            data: [],
            totalCount: 0,
            error: {
                isError: false,
                message: ''
            },
            pending: true
        },
        tags: []
    }
};

export const initialHomeTutorialsUIState: TutorialsSearchQuery = {
    rows: 3,
    start: 0,
    searchField: '',
    pagePath: '/content/developers/website/languages/en/tutorial-navigator',
    language: 'en_us',
    addDefaultLanguage: true,
    filters: []
};

export const initialHomeBlogsUIState: BlogsSearchQuery = {
    page: 0,
    limit: 3,
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

const tutorials = createSlice({
    name: 'homeTutorials',
    initialState: initialState.tutorials,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(fetchHomeTutorials.pending.type, (state, action: PendingAction<string, undefined>) => {
            const pending = action.pending;
            return { ...state, tutorials: { ...state.tutorials, pending } };
        });

        builder.addCase(fetchHomeTutorials.fulfilled.type, (state, action: PayloadAction<TutorialsSearchResult>) => {
            const data: TutorialsSearchResult = action.payload;
            const error: Error = { isError: false, message: '' };
            const pending = false;
            const tags: TutorialsTags = data.tags;

            return { ...state, tutorials: { data, error, pending }, tags };
        });

        builder.addCase(fetchHomeTutorials.rejected.type, (state, action: ErrorAction<string, undefined>) => {
            const pending = false;
            const error: Error = { isError: true, message: action.error.message };
            return { ...state, tutorials: { ...state.tutorials, error, pending } };
        });
    }
});

const blogs = createSlice({
    name: 'homeBlogs',
    initialState: initialState.blogs,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(fetchHomeBlogs.pending.type, (state, action: PendingAction<string, undefined>) => {
            const pending = action.pending;
            return { ...state, blogs: { ...state.blogs, pending } };
        });

        builder.addCase(fetchHomeBlogs.fulfilled.type, (state, action: PayloadAction<BlogsSearchResult>) => {
            const data: BlogsSearchResultContentItem[] = action.payload.contentItems;
            const totalCount = action.payload.totalCount;
            const pending = false;
            const error: Error = { isError: false, message: '' };

            const tags: BlogsManagedTag[] = [];
            data.forEach((entry: BlogsSearchResultContentItem) => {
                entry.managedTags.forEach((tag: BlogsManagedTag) => {
                    const findTagByGuide = (element: BlogsManagedTag) => element.guid === tag.guid;
                    if (tags.length > 0) {
                        if (!tags.find(findTagByGuide)) {
                            tags.push(tag);
                        }
                    } else {
                        tags.push(tag);
                    }
                });
            });

            return { ...state, blogs: { data, totalCount, error, pending }, tags };
        });

        builder.addCase(fetchHomeBlogs.rejected.type, (state, action: ErrorAction<string, undefined>) => {
            const pending = false;
            const error: Error = { isError: true, message: action.error.message };
            return { ...state, blogs: { ...state.blogs, error, pending } };
        });
    }
});

// State selectors
export const getHomeTutorials = (state: RootState) => state.home.tutorials.tutorials;
export const getHomeTutorialsError = (state: RootState) => state.home.tutorials.tutorials.error;
export const getHomeTutorialsTags = (state: RootState) => state.home.tutorials.tags;
export const getHomeTutorialsPending = (state: RootState) => state.home.tutorials.tutorials.pending;

export const getHomeBlogs = (state: RootState) => state.home.blogs.blogs;
export const getHomeBlogsError = (state: RootState) => state.home.blogs.blogs.error;
export const getHomeBlogsTags = (state: RootState) => state.home.blogs.tags;
export const getHomeBlogsPending = (state: RootState) => state.home.blogs.blogs.pending;

export default combineReducers({
    tutorials: tutorials.reducer,
    blogs: blogs.reducer
});
