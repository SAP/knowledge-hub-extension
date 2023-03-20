import React, { useState, useEffect } from 'react';
import type { FC } from 'react';

import { useTranslation } from 'react-i18next';
import { UILink, UIIcon } from '@sap-ux/ui-components';
import type { TutorialsSearchQuery, TutorialsTags, TutorialsTag } from '@sap/knowledge-hub-extension-types';

import { useAppSelector } from '../../store';
import { getTutorialsQuery, getTutorialsDataTags } from '../../features/tutorials/Tutorials.slice';
import { UIPill } from '../UI/UIPill/UIPill';

import './TutorialFilters.scss';

export type TutorialFiltersProps = {
    clearAllTags(): void;
    clearTag(tagId: string): void;
};

export const TutorialFilters: FC<TutorialFiltersProps> = ({ clearAllTags, clearTag }): JSX.Element => {
    const { t } = useTranslation();

    const activeQuery: TutorialsSearchQuery = useAppSelector(getTutorialsQuery);
    const activeTags: TutorialsTags = useAppSelector(getTutorialsDataTags);
    const [allTags, setAlltags] = useState(activeQuery.filters);

    /**
     * Returns the tag object based on the id.
     *
     * @param id The tag id.
     * @returns The tag object.
     */
    const getTagById = (id: string): TutorialsTag | null => {
        const key = Object.keys(activeTags).find((key: string) => key === id);
        if (key) {
            return activeTags[key];
        } else {
            return null;
        }
    };

    /**
     * Returns the tag pill.
     *
     * @param tagId The tag id.
     * @returns The tag pill | null.
     */
    const addTagPill = (tagId: string): JSX.Element | null => {
        const tag = getTagById(tagId);
        if (tag) {
            return <UIPill key={tagId} pillId={tagId} pillLabel={tag.title} callback={clearTag} />;
        } else {
            return null;
        }
    };

    useEffect(() => {
        setAlltags(activeQuery.filters);
    }, [activeQuery]);

    return (
        <React.Fragment>
            {allTags && allTags.length !== 0 && (
                <div className="tutorial-filters" data-testid="tutorial-filters">
                    <div className="tutorial-filters-header">
                        <UIIcon iconName="Tags" className="tutorial-filters-header-icon" />
                        <div className="tutorial-filters-header-title">{t('TUTORIALS_FILTERS_FILTERED_BY')}</div>
                    </div>
                    <div className="tutorial-filters-list" data-testid="tutorial-filters-list-of-pill">
                        <>
                            {allTags.map((tagId: string, _index: number) => {
                                return addTagPill(tagId);
                            })}

                            <UILink
                                className="tutorial-filters-clear"
                                title={t('TUTORIALS_FILTERS_CLEAR_ALL')}
                                href="#"
                                onClick={clearAllTags}>
                                {t('TUTORIALS_FILTERS_CLEAR_ALL')}
                            </UILink>
                        </>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};
