import type {
    Tag,
    BlogFiltersEntry,
    BlogsSearchQuery,
    LanguageId,
    BlogsCategory
} from '@sap/knowledge-hub-extension-types';

import {
    BlogFiltersEntryType,
    BlogSearchSortBy,
    allLanguages,
    blogsCategories
} from '@sap/knowledge-hub-extension-types';
import { store, actions } from '../../store';
import {
    blogsManagedTagsAdd,
    blogsManagedTagsDelete,
    blogsFilterEntryAdd,
    blogsFilterEntryDelete,
    blogsLanguageUpdate,
    blogsCategoryAdd,
    blogsCategoryDelete,
    blogsLoading,
    blogsOrderByUpdate,
    blogsSearchTermChanged
} from '../../store/actions';

/**
 * Return a tag object from a tag id.
 *
 * @param {string} id The tag id to look for
 * @param {Tag[]} tags The list of all tags
 * @returns {Tag} A tag object
 */
export const getBlogsTagById = (id: string, tags: Tag[] | []): Tag => {
    let res = {
        displayName: '',
        guid: id
    };
    tags.forEach((tag: Tag) => {
        if (tag.guid === id) {
            res = tag;
        }
    });
    return res;
};

/**
 * Return true or false if tag id is in an array of tag.
 *
 * @param {string} tagId A tag id to look for
 * @param {string[]} tags A list of tags
 * @returns {boolean} true|false if tag is in tags
 */
export const isManagedTag = (tagId: string, tags: string[]): boolean => {
    return tags.includes(tagId);
};

/**
 * Return true or false if category id is in an array of category.
 *
 * @param {string} categoryId The category id
 * @returns {boolean} true|false if category is in categories
 */
export const getCategoryLabel = (categoryId: string): string => {
    const category = blogsCategories.find((category: BlogsCategory) => category.id === categoryId);
    return category ? category.label : '';
};

/**
 * Fetch blogs data.
 *
 * @param {BlogsSearchQuery} query - The fetch query object
 * @param {boolean} home Set true if data is for home page or not
 */
export const fetchBlogData = (query: BlogsSearchQuery, home?: boolean): void => {
    const state = store.getState();
    const filters = state.blogs.ui.filtersEntries;

    store.dispatch(blogsLoading(true));
    actions.blogsFetchBlogs(query, filters, home ? home : false);
};

/**
 * Function to handle tag selection.
 *
 * @param {Tag} tag - The selected tag
 * @param {boolean} checked - true|false if tag is selected
 */
export const onTagSelected = (tag: Tag, checked: boolean): void => {
    const state = store.getState();
    const currentQuery = state.blogs.query;
    const currentBlogManagedTags: string[] = Object.assign([], currentQuery.managedTags);
    let blogTags: string[] = [];
    const filterEntry: BlogFiltersEntry = {
        id: tag.guid,
        label: tag.displayName,
        type: BlogFiltersEntryType.TAG
    };

    if (checked) {
        if (currentBlogManagedTags.length > 0) {
            if (!currentBlogManagedTags.find((element: string) => element === tag.guid)) {
                blogTags = currentBlogManagedTags;
                blogTags.push(tag.guid);
            }
        } else {
            blogTags = [tag.guid];
        }
        store.dispatch(blogsFilterEntryAdd(filterEntry));
        store.dispatch(blogsManagedTagsAdd(tag.guid));
    } else {
        blogTags = currentBlogManagedTags.filter((element: string) => element !== tag.guid);
        store.dispatch(blogsFilterEntryDelete(filterEntry.id));
        store.dispatch(blogsManagedTagsDelete(tag.guid));
    }
    const query: BlogsSearchQuery = Object.assign({}, currentQuery, { managedTags: blogTags });
    fetchBlogData(query);
};

/**
 * Function to handle language selection.
 *
 * @param {string} language - The selected language
 */
export const onLanguageSelected = (language: string): void => {
    const state = store.getState();
    const currentQuery = state.blogs.query;
    const filterEntry: BlogFiltersEntry = {
        id: language,
        label: allLanguages[language as LanguageId].text,
        type: BlogFiltersEntryType.LANGUAGE
    };

    store.dispatch(blogsFilterEntryAdd(filterEntry));
    store.dispatch(blogsLanguageUpdate(language));

    const options: BlogsSearchQuery = Object.assign({}, currentQuery, { language: language });
    fetchBlogData(options);
};

/**
 * Function to handle category selection.
 *
 * @param {string} categoryId  The selected category
 * @param checked true|false if category is selected
 */
export const onCategorySelected = (categoryId: string, checked: boolean): void => {
    const state = store.getState();
    const currentQuery = state.blogs.query;
    const currentBlogCategories: string[] = Object.assign([], currentQuery.blogCategories);
    let blogCategories: string[] = [];
    const filterEntry: BlogFiltersEntry = {
        id: categoryId,
        label: getCategoryLabel(categoryId),
        type: BlogFiltersEntryType.CATEGORY
    };

    if (checked) {
        if (currentBlogCategories.length > 0) {
            if (!currentBlogCategories.find((element: string) => element === categoryId)) {
                blogCategories = currentBlogCategories;
                blogCategories.push(categoryId);
            }
        } else {
            blogCategories = [categoryId];
        }
        store.dispatch(blogsFilterEntryAdd(filterEntry));
        store.dispatch(blogsCategoryAdd(categoryId));
    } else {
        blogCategories = currentBlogCategories.filter((element: string) => element !== categoryId);
        store.dispatch(blogsFilterEntryDelete(filterEntry.id));
        store.dispatch(blogsCategoryDelete(categoryId));
    }

    const options: BlogsSearchQuery = Object.assign({}, currentQuery, { blogCategories: blogCategories });
    fetchBlogData(options);
};

/**
 * Function to handle search term.
 * If search term is empty, orderBy is set to UPDATE_TIME.
 * If search term is not empty, orderBy is set to RELEVANCE.
 *
 * @param {string} searchTerm - The search term
 */
export const searchBlogs = (searchTerm: string): void => {
    const state = store.getState();
    const currentQuery = state.blogs.query;
    let orderBy = BlogSearchSortBy.UPDATE_TIME;
    if (searchTerm !== '') {
        store.dispatch(blogsOrderByUpdate(BlogSearchSortBy.RELEVANCE));
        orderBy = BlogSearchSortBy.RELEVANCE;
    }
    const options: BlogsSearchQuery = Object.assign({}, currentQuery, {
        searchTerm: searchTerm,
        orderBy: orderBy
    });
    store.dispatch(blogsSearchTermChanged(searchTerm));
    fetchBlogData(options);
};
