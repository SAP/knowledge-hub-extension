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
