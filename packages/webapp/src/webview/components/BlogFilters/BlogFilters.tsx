import React, { useState, useEffect } from 'react';
import type { FC } from 'react';

import { useTranslation } from 'react-i18next';
import { UILink, UIIcon } from '@sap-ux/ui-components';
import type { BlogsSearchQuery, BlogsManagedTag } from '@sap/knowledge-hub-extension-types';

import { useAppSelector } from '../../store';
import { getBlogsUI, getBlogsTags } from '../../features/blogs/Blogs.slice';
import { UIPill } from '../UI/UIPill/UIPill';

import './BlogFilters.scss';

export type BlogFiltersProps = {
    clearAllTags(): void;
    clearTag(tagId: string): void;
};

export const BlogFilters: FC<BlogFiltersProps> = ({ clearAllTags, clearTag }): JSX.Element => {
    const { t } = useTranslation();

    const activeUI: BlogsSearchQuery = useAppSelector(getBlogsUI);
    const activeTags: BlogsManagedTag[] = useAppSelector(getBlogsTags);
    const [allTags, setAlltags] = useState(activeUI.managedTags);

    /**
     * Returns the tag object based on the id.
     *
     * @param id The tag id.
     * @returns The tag object.
     */
    const getTagById = (id: string): BlogsManagedTag | undefined => {
        return activeTags.find((element: BlogsManagedTag) => element.guid === id);
    };

    /**
     * Returns the tag pill.
     *
     * @param tagTxt The tag text.
     * @returns The tag pill | null.
     */
    const addTagPill = (tagTxt: string): JSX.Element | null => {
        const tag = getTagById(tagTxt);
        if (tag) {
            return <UIPill key={tag.guid} pillId={tag.guid} pillTxt={tag.displayName} callback={clearTag} />;
        } else {
            return null;
        }
    };

    useEffect(() => {
        setAlltags(activeUI.managedTags);
    }, [activeUI]);

    return (
        <React.Fragment>
            {allTags && !!allTags.length && (
                <div className="blog-filters" data-testid="blog-filters">
                    <div className="blog-filters-header">
                        <UIIcon iconName="Tags" className="blog-filters-header-icon" />
                        <div className="blog-filters-header-title">{t('BLOGS_FILTERS_FILTERED_BY')}</div>
                    </div>
                    <div className="blog-filters-list" data-testid="blog-filters-list-of-pill">
                        <>
                            {allTags &&
                                allTags.map((tag: string, _index: number) => {
                                    return addTagPill(tag);
                                })}

                            <UILink
                                className="blog-filters-clear"
                                title={t('BLOGS_FILTERS_CLEAR_ALL')}
                                href="#"
                                onClick={clearAllTags}>
                                {t('BLOGS_FILTERS_CLEAR_ALL')}
                            </UILink>
                        </>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};
