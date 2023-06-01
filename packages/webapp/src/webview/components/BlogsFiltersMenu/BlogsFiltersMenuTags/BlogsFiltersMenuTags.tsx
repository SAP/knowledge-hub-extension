import React, { useState, useCallback, useEffect } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { UICheckbox, UISearchBox, UILink } from '@sap-ux/ui-components';

import type { Tag } from '@sap/knowledge-hub-extension-types';

import { useAppSelector } from '../../../store';
import { getManagedTags } from '../../../features/blogs/Blogs.slice';
import { onTagSelected } from '../../../features/blogs/Blogs.utils';
import { getTagsData } from '../../../features/tags/Tags.slice';

import { Loader } from '../../Loader';

import './BlogsFiltersMenuTags.scss';

export type BlogsFiltersMenuTagsProps = {
    withSearchOn: boolean;
    isSmall: boolean;
    loading: boolean;
};

export const BlogsFiltersMenuTags: FC<BlogsFiltersMenuTagsProps> = ({
    withSearchOn,
    isSmall,
    loading
}): JSX.Element => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const activeTags: string[] | undefined = useAppSelector(getManagedTags);
    const tags: Tag[] = useAppSelector(getTagsData);

    const [listTags, setListTags] = useState<Tag[]>(tags);
    const [isLoading, setIsLoading] = useState(loading);

    const onChange = useCallback(
        (_event: React.ChangeEvent<HTMLInputElement> | undefined, searchItem: string | undefined) => {
            if (searchItem) {
                const filteredTags: Tag[] = tags.filter((entry: Tag) => {
                    return entry.displayName.toUpperCase().includes(searchItem.toUpperCase());
                });
                setListTags(filteredTags);
            } else {
                setListTags(tags);
            }
        },
        []
    );

    const onClear = useCallback((): void => {
        setListTags(tags);
    }, []);

    const isTagChecked = (tagId: string): boolean => {
        return !!activeTags?.includes(tagId);
    };

    const viewAllTags = (): void => {
        const fullPath = '/blogs/tags';
        navigate(fullPath);
    };

    useEffect(() => {
        setIsLoading(loading);
    }, [loading]);

    useEffect(() => {
        setListTags(tags);
    }, [tags]);

    return (
        <div
            data-testid="blogs-filters-menu-tags"
            className={[
                'blogs-filters-menu-tags',
                isSmall ? 'blogs-filters-menu-tags__small' : 'blogs-filters-menu-tags__normal'
            ]
                .filter((x) => !!x)
                .join(' ')}>
            {isLoading && <Loader blockDOM={true} delayed={true} />}

            <div className="blogs-filters-menu-tags__header">
                <span className="blogs-filters-menu-tags__header-title">{t('BLOGS_FILTERS_TAGS')}</span>
                <span className="blogs-filters-menu-tags__header-title__view-all">
                    <UILink
                        title={t('BLOGS_FILTERS_TAGS_VIEW_ALL')}
                        href="#"
                        onClick={viewAllTags}
                        onKeyDown={viewAllTags}>
                        {t('BLOGS_FILTERS_TAGS_VIEW_ALL')}
                    </UILink>
                </span>
            </div>
            {withSearchOn && (
                <div className="blogs-filters-menu-tags__search">
                    <UISearchBox
                        onChange={onChange}
                        onClear={onClear}
                        className="blogs-filters-menu-tags__search__box"
                    />
                </div>
            )}
            {listTags.length > 0 && (
                <React.Fragment>
                    <div className="blogs-filters-menu-tags__content">
                        <ul
                            className="blogs-filters-menu-tags__content-list"
                            data-testid="blogs-filters-menu-tags__content-list">
                            {listTags.map((tag: Tag) => (
                                <li className="blogs-filters-menu-tags__content-list-tags" key={tag.guid}>
                                    <UICheckbox
                                        label={tag.displayName}
                                        checked={isTagChecked(tag.guid)}
                                        onChange={(_event, checked?: boolean) => {
                                            onTagSelected(tag, !!checked);
                                        }}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};
