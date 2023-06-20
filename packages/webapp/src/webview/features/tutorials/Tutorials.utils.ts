import type {
    TutorialsSearchResultData,
    TutorialsSearchQuery,
    TutorialsTagWithTitle,
    TutorialsTags
} from '@sap/knowledge-hub-extension-types';
import { store, actions } from '../../store';
import {
    tutorialsFiltersTagsAdd,
    tutorialsFiltersTagsDelete,
    tutorialsLoading,
    tutorialsSearchFieldChanged
} from '../../store/actions';

export const getTutorialsTag = (val: string, allTutorials: TutorialsSearchResultData): string => {
    if (allTutorials?.tags?.[val]) {
        return allTutorials.tags[val].title;
    } else {
        return '';
    }
};

export const getTutorialsTagTitle = (val: string, tags: TutorialsTags): string => {
    if (tags[val]) {
        return tags[val].title;
    } else {
        return '';
    }
};

export const isFilteredTag = (tagId: string, tags: string[]): boolean => {
    return tags.includes(tagId);
};

export const getTutorialsTagsTitle = (tags: string[], allTags: TutorialsTags): TutorialsTagWithTitle[] => {
    const tagsWithTitle: TutorialsTagWithTitle[] = [];
    tags.forEach((tagId: string) => {
        const title = getTutorialsTagTitle(tagId, allTags);

        tagsWithTitle.push({
            tag: tagId,
            title: title
        });
    });
    return tagsWithTitle;
};

/**
 * Fetch tutorials data.
 *
 * @param {TutorialsSearchQuery} query - The fetch query object
 * @param {boolean} home - Set true if data is for home page or not
 */
export const fetchTutorialsData = (query: TutorialsSearchQuery, home?: boolean): void => {
    const state = store.getState();
    const filters: string[] | undefined = state.tutorials.query.filters;
    let filtersWithTitle: TutorialsTagWithTitle[] = [];
    const tags: TutorialsTags = state.tags.tutorials.tags;

    if (filters && filters.length > 0) {
        filtersWithTitle = getTutorialsTagsTitle(filters, tags);
    }

    store.dispatch(tutorialsLoading(true));
    actions.tutorialsFetchTutorials(query, filtersWithTitle, home ? home : false);
};

/**
 * Function to handle tag selection.
 *
 * @param {string} tagId -  The selected tag
 * @param {boolean} checked - true|false if tag is selected
 */
export const onTagSelected = (tagId: string, checked: boolean): void => {
    const state = store.getState();
    const currentQuery = state.tutorials.query;
    const currentTutorialsFilters = Object.assign([], currentQuery.filters);
    let tutorialsTags: string[] = [];

    if (checked) {
        if (currentTutorialsFilters.length > 0) {
            if (!currentTutorialsFilters.find((element: string) => element === tagId)) {
                tutorialsTags = currentTutorialsFilters;
                tutorialsTags.push(tagId);
            }
        } else {
            tutorialsTags = [tagId];
        }
        store.dispatch(tutorialsFiltersTagsAdd(tagId));
    } else {
        tutorialsTags = currentTutorialsFilters.filter((element: string) => element !== tagId);
        store.dispatch(tutorialsFiltersTagsDelete(tagId));
    }

    const query: TutorialsSearchQuery = Object.assign({}, currentQuery, { filters: tutorialsTags });
    fetchTutorialsData(query);
};

/**
 * Function to handle search term change.
 * then dispatch fetch tutorials data.
 *
 * @param {string} searchTerm - The search term
 */
export const searchTutorials = (searchTerm: string): void => {
    const state = store.getState();
    const currentQuery = state.tutorials.query;
    const query: TutorialsSearchQuery = Object.assign({}, currentQuery, { searchField: searchTerm });
    store.dispatch(tutorialsSearchFieldChanged(searchTerm));
    fetchTutorialsData(query);
};
