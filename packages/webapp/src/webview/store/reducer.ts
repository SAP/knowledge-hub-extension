import { combineReducers } from '@reduxjs/toolkit';

import type { App, Home, Tutorials, Blogs, Tags, Search } from '@sap/knowledge-hub-extension-types';

import app, { initialState as appInitialState } from '../features/app/App.slice';
import tutorials, { initialState as tutorialsInitialState } from '../features/tutorials/Tutorials.slice';
import blogs, { initialState as blogsInitialState } from '../features/blogs/Blogs.slice';
import tags, { initialState as tagsInitialState } from '../features/tags/Tags.slice';
import search, { initialState as searchInitialState } from '../features/search/Search.slice';
import home, { initialState as homeInitialState } from '../features/home/Home.slice';

export interface KnowledgeHubState {
    app: App;
    home: Home;
    blogs: Blogs;
    tutorials: Tutorials;
    tags: Tags;
    search: Search;
    videos?: any;
}

/**
 * Return the complete knowledge hub state.
 *
 * @returns return an state object
 */
export function getInitialState(): KnowledgeHubState {
    return {
        app: appInitialState,
        home: homeInitialState,
        tutorials: tutorialsInitialState,
        tags: tagsInitialState,
        blogs: blogsInitialState,
        search: searchInitialState
    };
}

export const reducer = combineReducers({
    app,
    home,
    tutorials,
    tags,
    blogs,
    search
});
