import React, { useCallback } from 'react';
import type { FC } from 'react';
import { UILink, UIIcon } from '@sap-ux/ui-components';
import type { BlogsManagedTag } from '@sap/knowledge-hub-extension-types';

import './TagsBlog.scss';

export type TagsBlogProps = {
    tags: BlogsManagedTag[];
    callback(tag: BlogsManagedTag): void;
};

export const TagsBlog: FC<TagsBlogProps> = ({ tags, callback }: TagsBlogProps): JSX.Element => {
    const handleTagClick = useCallback(
        (tag: BlogsManagedTag) =>
            (event: React.MouseEvent<HTMLButtonElement | HTMLElement | HTMLAnchorElement, MouseEvent>) => {
                callback(tag);
            },
        []
    );

    const handleTagKeydown = useCallback(
        (tag: BlogsManagedTag) => (event: React.KeyboardEvent<HTMLButtonElement | HTMLElement | HTMLAnchorElement>) => {
            callback(tag);
        },
        []
    );

    return (
        <div className="tags-blog">
            <div className="tags-blog-icon">
                <UIIcon iconName="Tags" />
            </div>
            {tags.map((tag, index) => {
                return (
                    <div className="tags-blog-tag" key={tag.guid}>
                        <UILink
                            title="Filter by this tag"
                            href="#"
                            onClick={handleTagClick(tag)}
                            onKeyDown={handleTagKeydown(tag)}>
                            {tag.displayName}
                        </UILink>
                    </div>
                );
            })}
        </div>
    );
};
