import React from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { UILoader, UIPersona, UIPersonaSize } from '@sap-ux/ui-components';
import type { BlogsSearchResultContentItem, BlogsManagedTag } from '@sap/knowledge-hub-extension-types';

import { DateTime } from './DateTime';
import { TagsBlog } from './TagsBlog';

import './BlogCard.scss';

type BlogCardProps = {
    blog?: BlogsSearchResultContentItem;
    loading?: boolean;
    onSelectedTag(tag: BlogsManagedTag): void;
};

export const BlogCard: FC<BlogCardProps> = ({ blog, loading, onSelectedTag }: BlogCardProps): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div className="blog-card">
            {!loading && blog && (
                <div className="blog-card-container">
                    <div className="blog-card-persona">
                        <UIPersona
                            imageUrl={`https://avatars.services.sap.com/images/${blog.author.username}_small.png`}
                            size={UIPersonaSize.size72}
                            imageAlt={blog.author.displayName}
                            styles={{
                                root: {
                                    display: 'inline-block'
                                }
                            }}
                        />
                    </div>
                    <div className="blog-card-data">
                        <div className="blog-card-data-header">
                            <span className="blog-card-data-header-author">{blog.author.displayName}</span>
                            <span className="blog-card-data-header-date">
                                <DateTime createdDate={blog.created} updatedDate={blog.updated} />
                            </span>
                        </div>
                        <div className="blog-card-data-content">
                            <span className="blog-card-data-content-title">
                                <a href={blog.url} target="_blank" rel="noopener noreferrer" className="blog-card-link">
                                    {blog.title}
                                </a>
                            </span>
                            <span className="blog-card-data-content-description">{blog.description}</span>
                            <div className="blog-card-data-content-tags">
                                <TagsBlog tags={blog.managedTags} callback={onSelectedTag} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {loading && (
                <div className="blog-card-loading">
                    <UILoader label={t('BLOGS_LOADING_CONTENT')} labelPosition="bottom" className={'uiLoaderXLarge'} />
                </div>
            )}
        </div>
    );
};
