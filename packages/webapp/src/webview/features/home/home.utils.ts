import type { Home, Tags } from '@sap/knowledge-hub-extension-types';
import { store, actions } from '../../store';

import { fetchBlogData } from '../blogs/Blogs.utils';
import { fetchTutorialsData } from '../tutorials/Tutorials.utils';
import { initialHomeBlogsUIState, initialHomeTutorialsUIState } from './Home.slice';

/**
 * Fetches the blogs if they are not already fetched.
 */
export const fecthHomeBlogs = (): void => {
    const state = store.getState();
    const homeState: Home = state.home;
    if (homeState.blogs.blogs.totalCount === 0) {
        fetchBlogData(initialHomeBlogsUIState, true);
    }
};

/**
 * Fetches the tutorials if they are not already fetched.
 */
export const fecthHomeTutorials = (): void => {
    const state = store.getState();
    const homeState: Home = state.home;
    if (homeState.tutorials.tutorials.data.numFound === 0) {
        fetchTutorialsData(initialHomeTutorialsUIState, true);
    }
};

export const fetchTags = (): void => {
    const state = store.getState();
    const tagsState: Tags = state.tags;
    if (tagsState.result.data.filteredTags.length === 0) {
        actions.tagsFetchTags();
    }
};
