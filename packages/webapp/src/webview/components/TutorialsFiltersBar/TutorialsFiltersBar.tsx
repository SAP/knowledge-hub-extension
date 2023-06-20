import React, { useState, useEffect, useCallback } from 'react';
import type { FC } from 'react';
import { useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';
import { UIIcon, UISmallButton } from '@sap-ux/ui-components';
import type { TutorialsSearchQuery, TutorialsTags, TutorialsTag } from '@sap/knowledge-hub-extension-types';

import { store, useAppSelector } from '../../store';
import { getTutorialsQuery } from '../../features/tutorials/Tutorials.slice';
import { getTagsTutorialsData } from '../../features/tags/Tags.slice';
import { fetchTutorialsData } from '../../features/tutorials/Tutorials.utils';
import { tutorialsFiltersTagsDeleteAll, tutorialsFiltersTagsDelete } from '../../store/actions';

import { UIPill } from '../UI/UIPill/UIPill';

import './TutorialsFiltersBar.scss';

export type TutorialsFiltersBarProps = {
    editable?: boolean;
};

export const TutorialsFiltersBar: FC<TutorialsFiltersBarProps> = ({ editable }): JSX.Element => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const activeQuery: TutorialsSearchQuery = useAppSelector(getTutorialsQuery);
    const activeTags: TutorialsTags = useAppSelector(getTagsTutorialsData);
    const [allTags, setAlltags] = useState(activeQuery.filters);
    const isEditable = editable ?? true;

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

    const onClearAllTagFilter = useCallback((): void => {
        const state = store.getState();
        const currentQuery = state.tutorials.query;

        const options: TutorialsSearchQuery = Object.assign({}, currentQuery);
        options.filters = [];
        options.start = 1;

        dispatch(tutorialsFiltersTagsDeleteAll(null));
        fetchTutorialsData(options);
    }, []);

    const onClearTagFilter = (tagId: string): void => {
        const state = store.getState();
        const currentQuery = state.tutorials.query;

        const tagFilters = Object.assign([], currentQuery.filters);
        const options: TutorialsSearchQuery = Object.assign({}, currentQuery);

        if (tagFilters && tagFilters.length > 0) {
            const newTags = tagFilters.filter((element: string) => element !== tagId);
            options.filters = newTags;
        } else {
            options.filters = [];
        }

        if (options.filters && options.filters.length === 0) {
            options.start = 1;
        }

        dispatch(tutorialsFiltersTagsDelete(tagId));
        fetchTutorialsData(options);
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
            return (
                <UIPill
                    key={tagId}
                    pillId={tagId}
                    pillLabel={tag.title}
                    callback={onClearTagFilter}
                    clearButton={isEditable}
                />
            );
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
                <div className="tutorials-filters-bar" data-testid="tutorials-filters-bar">
                    <div className="tutorials-filters-bar-header">
                        <UIIcon iconName="Tags" className="tutorials-filters-bar-header-icon" />
                        <div className="tutorials-filters-bar-header-title">
                            {t('TUTORIALS_FILTERS_BAR_FILTERED_BY')}
                        </div>
                    </div>
                    <div className="tutorials-filters-bar-list" data-testid="tutorials-filters-bar-list-of-pill">
                        {allTags.map((tagId: string, _index: number) => {
                            return addTagPill(tagId);
                        })}
                        {isEditable && (
                            <UISmallButton primary onClick={onClearAllTagFilter}>
                                {t('TUTORIALS_FILTERS_BAR_CLEAR_ALL')}
                            </UISmallButton>
                        )}
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};
