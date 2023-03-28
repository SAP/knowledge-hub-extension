import React, { useState, useCallback, useEffect } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { UICheckbox } from '@sap-ux/ui-components';

import type { BlogsCategory } from '@sap/knowledge-hub-extension-types';
import { blogsCategories } from '@sap/knowledge-hub-extension-types';

import { useAppSelector } from '../../../store';
import { getBlogsCategories } from '../../../features/blogs/Blogs.slice';
import { onCategorySelected } from '../../../features/blogs/Blogs.utils';

import { Loader } from '../../Loader';

import './BlogsFiltersMenuCategories.scss';

export type BlogsFiltersMenuCategoriesProps = {
    isSmall: boolean;
    loading: boolean;
};

export const BlogsFiltersMenuCategories: FC<BlogsFiltersMenuCategoriesProps> = ({ isSmall, loading }) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(loading);
    const activeCategories: string[] | undefined = useAppSelector(getBlogsCategories);

    const isCategoryChecked = (categoryId: string): boolean => {
        return !!activeCategories?.includes(categoryId);
    };

    useEffect(() => {
        setIsLoading(loading);
    }, [loading]);

    return (
        <div
            data-testid="blogs-filters-menu-categories"
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
                                onChange={(_event, checked?: boolean) => {
                                    onCategorySelected(category.id, !!checked);
                                }}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
