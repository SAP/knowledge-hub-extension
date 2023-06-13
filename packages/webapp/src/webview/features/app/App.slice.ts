import { createSlice, combineReducers } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import i18next from 'i18next';

import {
    initialize,
    fetchBlogsTotalCount,
    fetchTutorialsTotalCount,
    PathType
} from '@sap/knowledge-hub-extension-types';
import type { App, AppState, AppUiState } from '@sap/knowledge-hub-extension-types';

import type { RootState } from '../../store';

import { appBlogsTotalCountUpdate, appTutorialsTotalCountUpdate } from '../../store/actions';

export const initialAppState: AppState = {
    appId: '',
    appFilters: {}
};

export const initialUiState: AppUiState = {
    ready: false,
    tabs: {
        home: {
            key: PathType.HOME,
            path: '/',
            headerText: '',
            ariaLabel: 'HOME_TAB',
            count: -1
        },
        tutorials: {
            key: PathType.TUTORIALS,
            path: '/tutorials',
            headerText: '',
            ariaLabel: 'TUTORIALS_TAB',
            count: -1
        },
        blogs: {
            key: PathType.BLOGS,
            path: '/blogs',
            headerText: '',
            ariaLabel: 'BLOGS_TAB',
            count: -1
        }
    }
};

const app = createSlice({
    name: 'app',
    initialState: initialAppState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(initialize.fulfilled.type, (state, action: PayloadAction<AppState>) => {
            state.appId = action.payload.appId;
        });
    }
});

const ui = createSlice({
    name: 'appUI',
    initialState: initialUiState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(initialize.fulfilled.type, (state) => {
                state.ready = true;
                state.tabs = {
                    home: {
                        key: PathType.HOME,
                        path: '/',
                        headerText: i18next.t('HOME_TAB'),
                        ariaLabel: 'HOME_TAB',
                        count: -1
                    },
                    tutorials: {
                        key: PathType.TUTORIALS,
                        path: '/tutorials',
                        headerText: i18next.t('TUTORIALS_TAB'),
                        ariaLabel: 'TUTORIALS_TAB',
                        count: -1
                    },
                    blogs: {
                        key: PathType.BLOGS,
                        path: '/blogs',
                        headerText: i18next.t('BLOGS_TAB'),
                        ariaLabel: 'BLOGS_TAB',
                        count: -1
                    }
                };
            })
            .addCase(fetchBlogsTotalCount.fulfilled.type, (state: AppUiState, action: PayloadAction<number>): void => {
                const blogsTab = state.tabs[PathType.BLOGS];
                if (blogsTab) {
                    blogsTab.count = action.payload;
                    state.tabs = { ...state.tabs, [PathType.BLOGS]: blogsTab };
                }
            })
            .addCase(
                fetchTutorialsTotalCount.fulfilled.type,
                (state: AppUiState, action: PayloadAction<number>): void => {
                    const tutorialsTab = state.tabs[PathType.TUTORIALS];
                    if (tutorialsTab) {
                        tutorialsTab.count = action.payload;
                        state.tabs = { ...state.tabs, [PathType.TUTORIALS]: tutorialsTab };
                    }
                }
            )
            .addMatcher(appBlogsTotalCountUpdate.match, (state: AppUiState, action: PayloadAction<number>): void => {
                const blogsTab = state.tabs[PathType.BLOGS];
                if (blogsTab) {
                    blogsTab.count = action.payload;
                    state.tabs = { ...state.tabs, [PathType.BLOGS]: blogsTab };
                }
            })
            .addMatcher(
                appTutorialsTotalCountUpdate.match,
                (state: AppUiState, action: PayloadAction<number>): void => {
                    const tutorialsTab = state.tabs[PathType.TUTORIALS];
                    if (tutorialsTab) {
                        tutorialsTab.count = action.payload;
                        state.tabs = { ...state.tabs, [PathType.TUTORIALS]: tutorialsTab };
                    }
                }
            );
    }
});

export const initialState: App = {
    app: initialAppState,
    ui: initialUiState
};

// State selectors
export const getAppId = (state: RootState) => state.app.app.appId;
export const getAppReady = (state: RootState) => state.app.ui.ready;
export const getAppTabs = (state: RootState) => state.app.ui.tabs;

export default combineReducers({ app: app.reducer, ui: ui.reducer });
