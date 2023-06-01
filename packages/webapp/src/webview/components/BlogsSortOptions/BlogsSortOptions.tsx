import React from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { UISeparator } from '@sap-ux/ui-components';
import type { BlogsSearchQuery } from '@sap/knowledge-hub-extension-types';
import { BlogSearchSortBy } from '@sap/knowledge-hub-extension-types';
import { useAppSelector } from '../../store';
import { blogsOrderByUpdate } from '../../store/actions';
import { getBlogsQuery } from '../../features/blogs/Blogs.slice';

import './BlogsSortOptions.scss';

export const BlogsSortOptions: FC = (): JSX.Element => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const activeQuery: BlogsSearchQuery = useAppSelector(getBlogsQuery);

    const isActive = (sort: string): boolean => {
        return activeQuery.orderBy === sort;
    };

    const changeSortBy = (sort: string) => () => {
        dispatch(blogsOrderByUpdate(sort));
    };

    return (
        <React.Fragment>
            {activeQuery.searchTerm !== '' && (
                <div className="blogs-sort-options">
                    <span className="blogs-sort-options__title">{t('BLOGS_SORT_BY_DESCRIPTION')}</span>
                    <div className="blogs-sort-options__options">
                        <span
                            onClick={changeSortBy(BlogSearchSortBy.RELEVANCE)}
                            className={[
                                'blogs-sort-options__options-entry',
                                isActive(BlogSearchSortBy.RELEVANCE)
                                    ? 'blogs-sort-options__options-entry__active'
                                    : 'blogs-sort-options__options-entry__not-active'
                            ]
                                .filter((x) => !!x)
                                .join(' ')}>
                            {t('BLOGS_SORT_BY_RELEVANCE')}
                        </span>
                        <UISeparator vertical className="blogs-sort-options__separator" />
                        <span
                            onClick={changeSortBy(BlogSearchSortBy.UPDATE_TIME)}
                            className={[
                                'blogs-sort-options__options-entry',
                                isActive(BlogSearchSortBy.UPDATE_TIME)
                                    ? 'blogs-sort-options__options-entry__active'
                                    : 'blogs-sort-options__options-entry__not-active'
                            ]
                                .filter((x) => !!x)
                                .join(' ')}>
                            {t('BLOGS_SORT_BY_LAST_UPDATED')}
                        </span>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};
