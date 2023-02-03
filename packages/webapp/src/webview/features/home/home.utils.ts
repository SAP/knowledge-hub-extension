import type { Home } from '@sap/knowledge-hub-extension-types';
import { store, actions } from '../../store';

import { initialHomeBlogsUIState, initialHomeTutorialsUIState } from './Home.slice';

/**
 * Fetches the blogs if they are not already fetched.
 */
export const fecthHomeBlogs = (): void => {
    const state = store.getState();
    const homeState: Home = state.home;
    if (homeState.blogs.blogs.totalCount === 0) {
        actions.blogsFetchBlogs(initialHomeBlogsUIState, true);
    }
};

/**
 * Fetches the tutorials if they are not already fetched.
 */
export const fecthHomeTutorials = (): void => {
    const state = store.getState();
    const homeState: Home = state.home;
    if (homeState.tutorials.data.numFound === 0) {
        actions.tutorialsFetchTutorials(initialHomeTutorialsUIState, true);
    }
};
