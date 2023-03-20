import React, { useState, useCallback, useEffect } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { UICheckbox, UISearchBox } from '@sap-ux/ui-components';

import type { BlogFiltersEntry } from '@sap/knowledge-hub-extension-types';
import { Tag, BlogFiltersEntryType, BlogsSearchQuery } from '@sap/knowledge-hub-extension-types';

import { store, actions, useAppSelector } from '../../../store';
import { getManagedTags } from '../../../features/blogs/Blogs.slice';
import { getTagsData } from '../../../features/tags/Tags.slice';
import {
    blogsManagedTagsAdd,
    blogsManagedTagsDelete,
    blogsFilterEntryAdd,
    blogsFilterEntryDelete,
    blogsTagsAdd,
    blogsLoading
} from '../../../store/actions';

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
    const dispatch = useDispatch();
    const activeTags: string[] | undefined = useAppSelector(getManagedTags);
    const tags = useAppSelector(getTagsData);

    const [listTags, setListTags] = useState(tags);
    const [isLoading, setIsLoading] = useState(loading);

    /**
     * Fetch blogs data.
     *
     * @param {BlogsSearchQuery} option - blogs search query
     */
    const fetchData = (option: BlogsSearchQuery) => {
        dispatch(blogsLoading(true));
        actions.blogsFetchBlogs(option, false);
    };

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

    const onTagSelected = (tag: Tag, checked: boolean): void => {
        const state = store.getState();
        const currentQuery = state.blogs.query;
        const currentBlogManagedTags: string[] = Object.assign([], currentQuery.managedTags);
        let blogTags: string[] = [];
        const filterEntry: BlogFiltersEntry = {
            id: tag.guid,
            label: tag.displayName,
            type: BlogFiltersEntryType.TAG
        };

        if (checked) {
            if (currentBlogManagedTags.length > 0) {
                if (!currentBlogManagedTags.find((element: string) => element === tag.guid)) {
                    blogTags = currentBlogManagedTags;
                    blogTags.push(tag.guid);
                }
            } else {
                blogTags = [tag.guid];
            }
            dispatch(blogsFilterEntryAdd(filterEntry));
            dispatch(blogsManagedTagsAdd(tag.guid));
        } else {
            blogTags = currentBlogManagedTags.filter((element: string) => element !== tag.guid);
            dispatch(blogsFilterEntryDelete(filterEntry.id));
            dispatch(blogsManagedTagsDelete(tag.guid));
        }
        dispatch(blogsTagsAdd(tag));
        const options: BlogsSearchQuery = Object.assign({}, currentQuery, { managedTags: blogTags });
        fetchData(options);
    };

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
