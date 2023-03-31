import React from 'react';
import type { FC } from 'react';

import { BlogsUiState } from '@sap/knowledge-hub-extension-types';

import { useAppSelector } from '../../store';
import { getBlogsUI } from '../../features/blogs/Blogs.slice';

import { BlogsFiltersMenuTags } from './BlogsFiltersMenuTags';
import { BlogsFiltersMenuLanguages } from './BlogsFiltersMenuLanguages';
import { BlogsFiltersMenuCategories } from './BlogsFiltersMenuCategories';

import './BlogsFiltersMenu.scss';

export type BlogsFiltersMenuProps = {
    loading: boolean;
};

export const BlogsFiltersMenu: FC<BlogsFiltersMenuProps> = ({ loading }): JSX.Element => {
    const activeUi: BlogsUiState = useAppSelector(getBlogsUI);
    const withSearchOn = true;
    const isSmall = false;

    return (
        <div
            className={[
                'blogs-filters-menu',
                activeUi.isFiltersMenuOpened ? 'blogs-filters-menu__opened' : 'blogs-filters-menu__closed'
            ]
                .filter((x) => !!x)
                .join(' ')}>
            <div data-testid="blogs-filters-menu__content" className="blogs-filters-menu__content">
                <div className="blogs-filters-menu__content__entries">
                    <BlogsFiltersMenuCategories isSmall={isSmall} loading={loading} />
                    <BlogsFiltersMenuTags withSearchOn={withSearchOn} isSmall={isSmall} loading={loading} />
                    <BlogsFiltersMenuLanguages isSmall={isSmall} loading={loading} />
                </div>
            </div>
        </div>
    );
};
