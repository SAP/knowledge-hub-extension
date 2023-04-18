import React, { useCallback } from 'react';
import type { FC } from 'react';
import { UILink } from '@sap-ux/ui-components';

import './TagsTutorial.scss';

export type TagsTutorialProps = {
    tagText: string;
    tagId: string;
    isFeatured: boolean;
    callback(tag: string): void;
};

export const TagsTutorial: FC<TagsTutorialProps> = ({
    tagText,
    tagId,
    isFeatured,
    callback
}: TagsTutorialProps): JSX.Element => {
    const handleTagIdClick = useCallback(
        (tagId: string) =>
            (_event: React.MouseEvent<HTMLButtonElement | HTMLElement | HTMLAnchorElement, MouseEvent>) => {
                callback(tagId);
            },
        []
    );

    const handleTagIdKeydown = useCallback(
        (tagId: string) => (_event: React.KeyboardEvent<HTMLButtonElement | HTMLElement | HTMLAnchorElement>) => {
            callback(tagId);
        },
        []
    );

    return (
        <div className="tags-tutorial">
            <div
                className={['tags-tutorial-tag', isFeatured ? 'tags-tutorial-tag-cut' : '']
                    .filter((x) => !!x)
                    .join(' ')}>
                <UILink
                    title="Filter by this tag"
                    href="#"
                    onClick={handleTagIdClick(tagId)}
                    onKeyDown={handleTagIdKeydown(tagId)}>
                    {tagText}
                </UILink>
            </div>
        </div>
    );
};
