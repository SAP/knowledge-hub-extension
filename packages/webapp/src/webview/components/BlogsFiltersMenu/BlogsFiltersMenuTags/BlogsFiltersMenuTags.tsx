import React, { useState, useCallback, useEffect } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { UICheckbox, UISearchBox } from '@sap-ux/ui-components';

import { Tag } from '@sap/knowledge-hub-extension-types';

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

    const activeTags: string[] | undefined = useAppSelector(getManagedTags);
    const tags = useAppSelector(getTagsData);

    const [listTags, setListTags] = useState(tags);
    const [isLoading, setIsLoading] = useState(loading);

    const handleTagIdClick = useCallback(
        (tag: Tag) => (_ev?: React.FormEvent<HTMLElement | HTMLInputElement>, isChecked?: boolean) => {
            if (isChecked) {
                onTagSelected(tag, isChecked);
            } else {
                onTagSelected(tag, false);
            }
        },
        []
    );

    const onSearch = useCallback((searchItem: string): void => {}, []);

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

    const isTagChecked = useCallback(
        (tagId: string): boolean => {
            if (activeTags) {
                return activeTags.includes(tagId);
            } else {
                return false;
            }
        },
        [activeTags]
    );

    useEffect(() => {
        setIsLoading(loading);
    }, [loading]);

    return (
        <div
            className={[
                'blogs-filters-menu-tags',
                isSmall ? 'blogs-filters-menu-tags__small' : 'blogs-filters-menu-tags__normal'
            ]
                .filter((x) => !!x)
                .join(' ')}>
            {isLoading && <Loader blockDOM={true} delayed={true} />}

            <div className="blogs-filters-menu-tags__header">
                <span className="blogs-filters-menu-tags__header-title">{t('BLOGS_FILTERS_TAGS')}</span>
            </div>
            {withSearchOn && (
                <div className="blogs-filters-menu-tags__search">
                    <UISearchBox
                        onChange={onChange}
                        onSearch={onSearch}
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
                                        onChange={handleTagIdClick(tag)}
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
