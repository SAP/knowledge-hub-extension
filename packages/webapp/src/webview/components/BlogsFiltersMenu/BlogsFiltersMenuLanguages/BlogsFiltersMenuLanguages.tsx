import React, { useState, useCallback, useEffect } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { UIChoiceGroup, ChoiceGroupOption } from '@sap-ux/ui-components';

import type { BlogFiltersEntry } from '@sap/knowledge-hub-extension-types';
import {
    supportedLanguages,
    allLanguages,
    LanguageId,
    BlogFiltersEntryType,
    BlogsSearchQuery
} from '@sap/knowledge-hub-extension-types';

import { store, actions, useAppSelector } from '../../../store';
import { getBlogsLanguage } from '../../../features/blogs/Blogs.slice';
import { blogsLanguageUpdate, blogsFilterEntryAdd, blogsLoading } from '../../../store/actions';

import { Loader } from '../../Loader';

import './BlogsFiltersMenuLanguages.scss';

export type BlogsFiltersMenuLanguagesProps = {
    isSmall: boolean;
    loading: boolean;
};

export const BlogsFiltersMenuLanguages: FC<BlogsFiltersMenuLanguagesProps> = ({ isSmall, loading }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(loading);
    const activeLanguage: string | null = useAppSelector(getBlogsLanguage);

    /**
     * Fetch blogs data.
     *
     * @param {BlogsSearchQuery} option - blogs search query
     */
    const fetchData = (option: BlogsSearchQuery) => {
        dispatch(blogsLoading(true));
        actions.blogsFetchBlogs(option, false);
    };

    const onLanguageSelected = (language: string): void => {
        const state = store.getState();
        const currentQuery = state.blogs.query;
        const filterEntry: BlogFiltersEntry = {
            id: language,
            label: allLanguages[language as LanguageId].text,
            type: BlogFiltersEntryType.LANGUAGE
        };

        dispatch(blogsFilterEntryAdd(filterEntry));
        dispatch(blogsLanguageUpdate(language));

        const options: BlogsSearchQuery = Object.assign({}, currentQuery, { language: language });
        fetchData(options);
    };

    const handleLanguageClick = useCallback(
        (_evt?: React.FormEvent<HTMLInputElement | HTMLElement>, option?: ChoiceGroupOption | undefined) => {
            if (option) {
                onLanguageSelected(option.key);
            }
        },
        []
    );

    useEffect(() => {
        setIsLoading(loading);
    }, [loading]);

    return (
        <div
            className={[
                'blogs-filters-menu-languages',
                isSmall ? 'blogs-filters-menu-languages__small' : 'blogs-filters-menu-languages__normal'
            ]
                .filter((x) => !!x)
                .join(' ')}>
            {isLoading && <Loader blockDOM={true} delayed={true} />}

            <div className="blogs-filters-menu-languages__header">
                <span className="blogs-filters-menu-languages__header-title">{t('BLOGS_FILTERS_LANGUAGES')}</span>
            </div>

            {supportedLanguages.length > 0 && (
                <React.Fragment>
                    <div className="blogs-filters-menu-languages__content">
                        <div
                            className="blogs-filters-menu-languages__content-list"
                            data-testid="blogs-filters-menu-languages__content-list">
                            <UIChoiceGroup
                                selectedKey={activeLanguage}
                                options={supportedLanguages}
                                onChange={handleLanguageClick}
                                required={false}
                            />
                        </div>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};
