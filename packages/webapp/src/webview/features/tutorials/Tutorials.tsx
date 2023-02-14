import React, { useState, useEffect, useCallback } from 'react';
import type { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import type { TutorialsState, TutorialsEntry, TutorialsSearchQuery } from '@sap/knowledge-hub-extension-types';
import { TUTORIALS_LIMIT_PER_PAGE } from '@sap/knowledge-hub-extension-types';

import { TutorialCard } from '../../components/TutorialCard';

import {
    tutorialsPageChanged,
    tutorialsFiltersTagsAdd,
    tutorialsFiltersTagsDeleteAll,
    tutorialsFiltersTagsDelete
} from '../../store/actions';
import { actions, useAppSelector } from '../../store';
import { getTutorials, getTutorialsUI } from './Tutorials.slice';
import { getTutorialsTag } from './Tutorials.utils';
import { getSearchTerm } from '../search/Search.slice';

import { UIPagination } from '../../components/UI/UIPagination';
import { UILoader } from '@sap-ux/ui-components';
import { NoResult } from '../../components/NoResult';
import { WithError } from '../../components/WithError';
import { TutorialFilters } from '../../components/TutorialFilters';

import './Tutorials.scss';

export const Tutorials: FC = (): JSX.Element => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const activeTutorials: TutorialsState = useAppSelector(getTutorials);
    const activeUI: TutorialsSearchQuery = useAppSelector(getTutorialsUI);
    const activeSearchTerm: string = useAppSelector(getSearchTerm);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [tutorials, setTutorials] = useState<TutorialsEntry[]>();
    const [totalCount, setTotalCount] = useState(0);
    const [pageOffset, setPageOffset] = useState(activeUI.start);
    const [noResult, setNoResult] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchData = (option: TutorialsSearchQuery) => {
        const options = Object.assign({}, activeUI, option);
        setLoading(true);
        actions.tutorialsFetchTutorials(options, false);
    };

    const handlePageClick = useCallback((event: any) => {
        const options: TutorialsSearchQuery = {};
        options.start = event.selected;

        dispatch(tutorialsPageChanged(event.selected));
        setPageOffset(event.selected);

        fetchData(options);
    }, []);

    const onTagSelected = useCallback((tagId: string): void => {
        const options: TutorialsSearchQuery = {};
        dispatch(tutorialsFiltersTagsAdd(tagId));
        options.filters = [tagId];
        fetchData(options);
    }, []);

    const onClearAllTagFilter = useCallback((): void => {
        const options: TutorialsSearchQuery = {};
        options.filters = [];

        if (searchTerm !== '') {
            options.searchField = activeSearchTerm;
        }

        dispatch(tutorialsFiltersTagsDeleteAll(null));

        fetchData(options);
    }, [activeUI]);

    const onClearTagFilter = useCallback(
        (tagId: string): void => {
            const options: TutorialsSearchQuery = {};
            options.filters = Object.assign([], activeUI.filters);

            if (options.filters && options.filters.length > 0) {
                const newTags = options.filters.filter((element: string) => element !== tagId);
                options.filters = newTags;
            }

            if (searchTerm !== '') {
                options.searchField = activeSearchTerm;
            }

            dispatch(tutorialsFiltersTagsDelete(tagId));

            fetchData(options);
        },
        [activeUI]
    );

    useEffect(() => {
        if (searchTerm !== activeSearchTerm) {
            const options: TutorialsSearchQuery = {};
            options.searchField = activeSearchTerm;
            setSearchTerm(activeSearchTerm);
            fetchData(options);
        }
    }, [activeSearchTerm]);

    useEffect(() => {
        const options: TutorialsSearchQuery = {};
        let limit;

        if (activeTutorials.error.isError) {
            setTotalCount(0);
            setLoading(false);
            setNoResult(true);
            setError(true);
        } else if (!activeTutorials.pending) {
            if (location.state && location.state.tagId) {
                const tagId = location.state.tagId;
                dispatch(tutorialsFiltersTagsAdd(tagId));
                options.filters = [tagId];
                fetchData(options);
                navigate(location.pathname, { replace: true });
            }

            if (activeTutorials && activeTutorials.data.numFound > 0) {
                setTutorials(activeTutorials.data.result);

                if (activeUI.rows) {
                    limit = activeTutorials.data.numFound / activeUI.rows;
                } else {
                    limit = activeTutorials.data.numFound / TUTORIALS_LIMIT_PER_PAGE;
                }
                setTotalCount(Math.ceil(limit));

                setLoading(false);
                setNoResult(false);
                setError(activeTutorials.error.isError);
            } else if (activeTutorials.data.numFound === 0) {
                setTotalCount(0);
                setLoading(false);
                setNoResult(true);
            } else if (activeTutorials.data.numFound === -1) {
                setLoading(true);
                fetchData(options);
            }
        }
    }, [activeTutorials]);

    return (
        <div className="tutorials">
            <div className="tutorials-header">
                <h2 className="tutorials-header-title">{t('TUTORIALS_TITLE')}</h2>
                <h3 className="tutorials-header-description">{t('TUTORIALS_DESCRIPTION')}</h3>
            </div>

            {activeUI.filters && activeUI.filters.length !== 0 && (
                <TutorialFilters clearAllTags={onClearAllTagFilter} clearTag={onClearTagFilter} />
            )}

            <div className="tutorials-content">
                {!(loading || error) &&
                    tutorials &&
                    tutorials.map((tutorial, index) => {
                        return (
                            <TutorialCard
                                key={tutorial.imsId}
                                tutorial={tutorial}
                                tag={getTutorialsTag(tutorial.primaryTag, activeTutorials.data)}
                                tags={activeTutorials.data.tags}
                                onSelectedTag={onTagSelected}
                            />
                        );
                    })}
            </div>
            {loading && (
                <div className="tutorials-loading">
                    <UILoader
                        label={t('TUTORIALS_LOADING_CONTENT')}
                        labelPosition="bottom"
                        className={'uiLoaderXLarge'}
                    />
                </div>
            )}
            {error && <WithError />}
            {noResult && <NoResult />}
            <div className="tutorials-pagination">
                {totalCount > 0 && (
                    <UIPagination
                        nextLabel={t('UI_PAGINATION_CAPTION_NEXT')}
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        pageCount={totalCount}
                        previousLabel={t('UI_PAGINATION_CAPTION_PREVIOUS')}
                        forcePage={pageOffset}
                    />
                )}
            </div>
        </div>
    );
};
