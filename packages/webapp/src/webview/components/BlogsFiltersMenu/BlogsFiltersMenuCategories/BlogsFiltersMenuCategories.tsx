import React, { useState, useCallback, useEffect } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { UICheckbox } from '@sap-ux/ui-components';

import type { BlogsCategory, BlogFiltersEntry } from '@sap/knowledge-hub-extension-types';
import { blogsCategories, BlogFiltersEntryType, BlogsSearchQuery } from '@sap/knowledge-hub-extension-types';

import { store, actions, useAppSelector } from '../../../store';
import { getBlogsCategories } from '../../../features/blogs/Blogs.slice';
import {
    blogsCategoryAdd,
    blogsCategoryDelete,
    blogsFilterEntryAdd,
    blogsFilterEntryDelete,
    blogsLoading
} from '../../../store/actions';

import { Loader } from '../../Loader';

import './BlogsFiltersMenuCategories.scss';

export type BlogsFiltersMenuCategoriesProps = {
    isSmall: boolean;
    loading: boolean;
};

export const BlogsFiltersMenuCategories: FC<BlogsFiltersMenuCategoriesProps> = ({ isSmall, loading }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(loading);
    const activeCategories: string[] | undefined = useAppSelector(getBlogsCategories);

    /**
     * Fetch blogs data.
     *
     * @param {BlogsSearchQuery} option - blogs search query
     */
    const fetchData = (option: BlogsSearchQuery) => {
        dispatch(blogsLoading(true));
        actions.blogsFetchBlogs(option, false);
    };

    const handleCategoryClick = useCallback(
        (category: BlogsCategory) => (_ev?: React.FormEvent<HTMLElement | HTMLInputElement>, isChecked?: boolean) => {
            if (isChecked) {
                onCategorySelected(category.id, isChecked);
            } else {
                onCategorySelected(category.id, false);
            }
        },
        []
    );

    const isCategoryChecked = useCallback(
        (categoryId: string): boolean => {
            if (activeCategories) {
                return activeCategories.includes(categoryId);
            } else {
                return false;
            }
        },
        [activeCategories]
    );

    const getCategoryLabel = (categoryId: string): string => {
        const category = blogsCategories.find((category: BlogsCategory) => category.id === categoryId);
        return category ? category.label : '';
    };

    const onCategorySelected = (categoryId: string, checked: boolean): void => {
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
            dispatch(blogsFilterEntryAdd(filterEntry));
            dispatch(blogsCategoryAdd(categoryId));
        } else {
            blogCategories = currentBlogCategories.filter((element: string) => element !== categoryId);
            dispatch(blogsFilterEntryDelete(filterEntry.id));
            dispatch(blogsCategoryDelete(categoryId));
        }

        const options: BlogsSearchQuery = Object.assign({}, currentQuery, { blogCategories: blogCategories });
        fetchData(options);
    };

    useEffect(() => {
        setIsLoading(loading);
    }, [loading]);

    return (
        <div
            className={[
                'blogs-filters-menu-categories',
                isSmall ? 'blogs-filters-menu-categories__small' : 'blogs-filters-menu-categories__normal'
            ]
                .filter((x) => !!x)
                .join(' ')}>
            {isLoading && <Loader blockDOM={true} delayed={true} />}

            <div className="blogs-filters-menu-categories__header">
                <span className="blogs-filters-menu-categories__header-title">{t('BLOGS_FILTERS_CATEGORIES')}</span>
            </div>

            <div className="blogs-filters-menu-categories__content">
                <ul
                    className="blogs-filters-menu-categories__content-list"
                    data-testid="blogs-filters-menu-categories__content-list">
                    {blogsCategories.map((category: BlogsCategory) => (
                        <li className="blogs-filters-menu-categories__content-list-categories" key={category.id}>
                            <UICheckbox
                                label={category.label}
                                checked={isCategoryChecked(category.id)}
                                onChange={handleCategoryClick(category)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
