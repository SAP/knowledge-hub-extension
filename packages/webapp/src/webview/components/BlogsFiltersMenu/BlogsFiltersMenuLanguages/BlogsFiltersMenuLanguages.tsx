import React, { useState, useCallback, useEffect } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { UIChoiceGroup, ChoiceGroupOption } from '@sap-ux/ui-components';

import { supportedLanguages } from '@sap/knowledge-hub-extension-types';

import { useAppSelector } from '../../../store';
import { getBlogsLanguage } from '../../../features/blogs/Blogs.slice';
import { onLanguageSelected } from '../../../features/blogs/Blogs.utils';

import { Loader } from '../../Loader';

import './BlogsFiltersMenuLanguages.scss';

export type BlogsFiltersMenuLanguagesProps = {
    isSmall: boolean;
    loading: boolean;
};

export const BlogsFiltersMenuLanguages: FC<BlogsFiltersMenuLanguagesProps> = ({ isSmall, loading }) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(loading);
    const activeLanguage: string | null = useAppSelector(getBlogsLanguage);

    useEffect(() => {
        setIsLoading(loading);
    }, [loading]);

    return (
        <div
            data-testid="blogs-filters-menu-languages"
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
                                onChange={(_event, option?: ChoiceGroupOption | undefined) => {
                                    if (option) {
                                        onLanguageSelected(option.key);
                                    }
                                }}
                                required={false}
                            />
                        </div>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};
