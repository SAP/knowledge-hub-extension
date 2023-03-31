import React, { useState, useEffect, useCallback } from 'react';
import type { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { UIIcon } from '@sap-ux/ui-components';

import { BlogFiltersEntry, BlogFiltersEntryType, BlogsSearchQuery } from '@sap/knowledge-hub-extension-types';

import { store, actions, useAppSelector } from '../../store';
import { getBlogsUIFiltersEntries } from '../../features/blogs/Blogs.slice';
import {
    blogsManagedTagsDelete,
    blogsManagedTagsDeleteAll,
    blogsLanguageUpdate,
    blogsCategoryDelete,
    blogsCategoryDeleteAll,
    blogsFilterEntryDelete,
    blogsFilterEntryDeleteAll,
    blogsLoading
} from '../../store/actions';

import { UIPill } from '../UI/UIPill/UIPill';
import { UISmallButton } from '../UI/UISmallButton';

import './BlogsFiltersBar.scss';

export const BlogsFiltersBar: FC = (): JSX.Element => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const activeFiltersEntries = useAppSelector(getBlogsUIFiltersEntries);
    const [filtersEntries, setFiltersEntries] = useState<BlogFiltersEntry[]>([]);

    const fetchData = (option: BlogsSearchQuery) => {
        dispatch(blogsLoading(true));
        actions.blogsFetchBlogs(option, false);
    };

    const onClearAllFilterEntries = useCallback((): void => {
        const state = store.getState();
        const currentQuery = state.blogs.query;

        const options: BlogsSearchQuery = Object.assign({}, currentQuery);
        options.blogCategories = [];
        options.managedTags = [];
        options.language = '';

        dispatch(blogsCategoryDeleteAll(null));
        dispatch(blogsManagedTagsDeleteAll(null));
        dispatch(blogsLanguageUpdate(null));
        dispatch(blogsFilterEntryDeleteAll(null));
        fetchData(options);
    }, []);

    const onClearFilterEntry = useCallback((id: string): void => {
        const state = store.getState();
        const currentQuery = state.blogs.query;
        const currentFiltersEntries = state.blogs.ui.filtersEntries;

        const options: BlogsSearchQuery = Object.assign({}, currentQuery);
        const filtersEntry = currentFiltersEntries.find((element: BlogFiltersEntry) => element.id === id);

        if (filtersEntry) {
            if (filtersEntry.type === BlogFiltersEntryType.CATEGORY) {
                const currentBlogCategories: string[] = Object.assign([], currentQuery.blogCategories);
                const categories = currentBlogCategories.filter((element: string) => element !== id);
                options.blogCategories = categories;
                dispatch(blogsCategoryDelete(id));
            }
            if (filtersEntry.type === BlogFiltersEntryType.TAG) {
                const currentManagedTags: string[] = Object.assign([], currentQuery.managedTags);
                const tags = currentManagedTags.filter((element: string) => element !== id);
                options.managedTags = tags;
                dispatch(blogsManagedTagsDelete(id));
            }
            if (filtersEntry.type === BlogFiltersEntryType.LANGUAGE) {
                options.language = '';
                dispatch(blogsLanguageUpdate(null));
            }
        }
        dispatch(blogsFilterEntryDelete(id));
        fetchData(options);
    }, []);

    useEffect(() => {
        setFiltersEntries(activeFiltersEntries);
    }, [activeFiltersEntries]);

    return (
        <React.Fragment>
            {filtersEntries.length !== 0 && (
                <div className="blogs-filters-bar" data-testid="blogs-filters-bar">
                    <div className="blogs-filters-bar-header">
                        <UIIcon iconName="Tags" className="blogs-filters-bar-header-icon" />
                        <div className="blogs-filters-bar-header-title">{t('BLOGS_FILTERS_BAR_FILTERED_BY')}</div>
                    </div>
                    <div className="blogs-filters-bar-list" data-testid="blogs-filters-bar-list-of-pill">
                        {filtersEntries.map((entry: BlogFiltersEntry, _index: number) => {
                            return (
                                <UIPill
                                    key={entry.id}
                                    pillId={entry.id}
                                    pillLabel={entry.label}
                                    callback={onClearFilterEntry}
                                />
                            );
                        })}

                        <UISmallButton primary onClick={onClearAllFilterEntries}>
                            {t('BLOGS_FILTERS_BAR_CLEAR_ALL')}
                        </UISmallButton>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};
