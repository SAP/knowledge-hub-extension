import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { UIIcon, UISmallButton } from '@sap-ux/ui-components';

import type { BlogFiltersEntry, BlogsSearchQuery } from '@sap/knowledge-hub-extension-types';
import { BlogFiltersEntryType } from '@sap/knowledge-hub-extension-types';

import { useAppSelector } from '../../store';
import { getBlogsUIFiltersEntries, getBlogsQuery } from '../../features/blogs/Blogs.slice';
import { fetchBlogData } from '../../features/blogs/Blogs.utils';
import {
    blogsManagedTagsDelete,
    blogsManagedTagsDeleteAll,
    blogsLanguageUpdate,
    blogsCategoryDelete,
    blogsCategoryDeleteAll,
    blogsFilterEntryDelete,
    blogsFilterEntryDeleteAll
} from '../../store/actions';

import { UIPill } from '../UI/UIPill/UIPill';

import './BlogsFiltersBar.scss';

export type BlogsFiltersBarProps = {
    editable?: boolean;
};

export const BlogsFiltersBar: FC<BlogsFiltersBarProps> = ({ editable }): JSX.Element => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const activeFiltersEntries = useAppSelector(getBlogsUIFiltersEntries);
    const activeQuery = useAppSelector(getBlogsQuery);

    const [filtersEntries, setFiltersEntries] = useState<BlogFiltersEntry[]>([]);
    const isEditable = editable ?? true;

    const onClearAllFilterEntries = (): void => {
        const currentQuery = activeQuery;

        const options: BlogsSearchQuery = Object.assign({}, currentQuery);
        options.blogCategories = [];
        options.managedTags = [];
        options.language = '';

        dispatch(blogsCategoryDeleteAll(null));
        dispatch(blogsManagedTagsDeleteAll(null));
        dispatch(blogsLanguageUpdate(''));
        dispatch(blogsFilterEntryDeleteAll(null));
        fetchBlogData(options);
    };

    const onClearFilterEntry = (id: string): void => {
        const currentFiltersEntries = activeFiltersEntries;
        const currentQuery = activeQuery;

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
                dispatch(blogsLanguageUpdate(''));
            }
        }
        dispatch(blogsFilterEntryDelete(id));
        fetchBlogData(options);
    };

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
                                    clearButton={isEditable}
                                />
                            );
                        })}
                        {isEditable && (
                            <UISmallButton primary onClick={onClearAllFilterEntries}>
                                {t('BLOGS_FILTERS_BAR_CLEAR_ALL')}
                            </UISmallButton>
                        )}
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};
