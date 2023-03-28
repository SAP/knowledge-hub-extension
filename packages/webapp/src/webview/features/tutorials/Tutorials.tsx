import React, { useState, useEffect, useCallback } from 'react';
import type { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import type {
    TutorialsState,
    TutorialsEntry,
    TutorialsSearchQuery,
    TutorialsTags,
    TutorialsFacets
} from '@sap/knowledge-hub-extension-types';
import { TUTORIALS_LIMIT_PER_PAGE } from '@sap/knowledge-hub-extension-types';

import {
    tutorialsPageChanged,
    tutorialsFiltersTagsAdd,
    tutorialsFiltersTagsDeleteAll,
    tutorialsFiltersTagsDelete
} from '../../store/actions';
import { store, actions, useAppSelector } from '../../store';
import { getTutorials, getTutorialsQuery, getTutorialsUIIsLoading } from './Tutorials.slice';
import { getTutorialsTag, isFilteredTag } from './Tutorials.utils';
import { getSearchTerm } from '../search/Search.slice';

import { TutorialCard } from '../../components/TutorialCard';
import { TutorialsResultNumber } from '../../components/TutorialsResultNumber';
import { TutorialsFiltersMenu } from '../../components/TutorialsFiltersMenu';
import { TutorialsFiltersBar } from '../../components/TutorialsFiltersBar';
import { UIPagination } from '../../components/UI/UIPagination';
import { Loader } from '../../components/Loader';
import { NoResult } from '../../components/NoResult';
import { WithError } from '../../components/WithError';

import './Tutorials.scss';

export const Tutorials: FC = (): JSX.Element => {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const activeTutorials: TutorialsState = useAppSelector(getTutorials);
    const activeQuery: TutorialsSearchQuery = useAppSelector(getTutorialsQuery);
    const activeSearchTerm: string = useAppSelector(getSearchTerm);
    const activeLoading = useAppSelector(getTutorialsUIIsLoading);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [tutorials, setTutorials] = useState<TutorialsEntry[]>();
    const [totalPageCount, setTotalPageCount] = useState(0);

    const [totalNumber, setTotalNumber] = useState(0);
    const [countGroups, setCountGroups] = useState(0);
    const [countMissions, setCountMissions] = useState(0);
    const [countTutorials, setCountTutorials] = useState(0);
    const [facets, setFacets] = useState<TutorialsFacets>({});
    const [tags, setTags] = useState<TutorialsTags>({});

    const [pageOffset, setPageOffset] = useState(activeQuery.start);
    const [noResult, setNoResult] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchData = (option: TutorialsSearchQuery) => {
        const options = Object.assign({}, activeQuery, option);
        setLoading(true);
        actions.tutorialsFetchTutorials(options, false);
    };

    const handlePageClick = useCallback(
        (event: any) => {
            const options: TutorialsSearchQuery = Object.assign({}, activeQuery, { start: event.selected });

            dispatch(tutorialsPageChanged(event.selected));
            setPageOffset(event.selected);

            fetchData(options);
        },
        [activeQuery]
    );

    const onTagSelected = (tagId: string): void => {
        const state = store.getState();
        const tagFilters = Object.assign([], state.tutorials.query.filters);

        if (!isFilteredTag(tagId, tagFilters)) {
            const options: TutorialsSearchQuery = {};
            const state = store.getState();
            const tagFilters = Object.assign([], state.tutorials.query.filters);

            if (state.search.term !== '') {
                options.searchField = state.search.term;
            }

            tagFilters.push(tagId);

            dispatch(tutorialsFiltersTagsAdd(tagId));

            options.filters = tagFilters;
            fetchData(options);
        }
    };

    const onClearAllTagFilter = useCallback((): void => {
        const options: TutorialsSearchQuery = {};
        options.filters = [];
        options.start = 1;

        if (searchTerm !== '') {
            options.searchField = activeSearchTerm;
        }

        dispatch(tutorialsFiltersTagsDeleteAll(null));

        fetchData(options);
    }, []);

    const onClearTagFilter = (tagId: string): void => {
        const state = store.getState();
        const tagFilters = Object.assign([], state.tutorials.query.filters);
        const options: TutorialsSearchQuery = {};

        if (tagFilters && tagFilters.length > 0) {
            const newTags = tagFilters.filter((element: string) => element !== tagId);
            options.filters = newTags;
        } else {
            options.filters = [];
        }

        if (options.filters && options.filters.length === 0) {
            options.start = 1;
        }

        if (state.search.term !== '') {
            options.searchField = state.search.term;
        }

        dispatch(tutorialsFiltersTagsDelete(tagId));

        fetchData(options);
    };

    useEffect(() => {
        const options: TutorialsSearchQuery = {};
        let limit;

        if (activeTutorials.error.isError) {
            setTotalPageCount(0);
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
                setTotalNumber(activeTutorials.data.numFound);
                setCountGroups(activeTutorials.data.countGroups);
                setCountMissions(activeTutorials.data.countMissions);
                setCountTutorials(activeTutorials.data.countTutorials);
                setFacets(activeTutorials.data.facets);
                setTags(activeTutorials.data.tags);

                if (activeQuery.rows) {
                    limit = activeTutorials.data.numFound / activeQuery.rows;
                } else {
                    limit = activeTutorials.data.numFound / TUTORIALS_LIMIT_PER_PAGE;
                }
                setTotalPageCount(Math.ceil(limit));

                setLoading(false);
                setNoResult(false);
                setError(activeTutorials.error.isError);
            } else if (activeTutorials.data.numFound === 0) {
                setTotalPageCount(0);
                setLoading(false);
                setNoResult(true);
            } else if (activeTutorials.data.numFound === -1) {
                setLoading(true);
                setNoResult(false);
                fetchData(options);
            }
        }
    }, [activeTutorials]);

    useEffect(() => {
        if (searchTerm !== activeSearchTerm) {
            const options: TutorialsSearchQuery = {};
            const state = store.getState();
            const tagFilters = Object.assign([], state.tutorials.query.filters);

            options.filters = tagFilters;
            options.searchField = activeSearchTerm;
            setSearchTerm(activeSearchTerm);
            fetchData(options);
        }
    }, [activeSearchTerm]);

    useEffect(() => {
        setLoading(activeLoading);
    }, [activeLoading]);

    return (
        <div className="tutorials">
            <div className="tutorials-filters">
                <div className="tutorials-filters-wrapper">
                    <TutorialsFiltersMenu
                        facets={facets}
                        tags={tags}
                        onSelectedTag={onTagSelected}
                        onClearedTag={onClearTagFilter}
                    />
                    <TutorialsFiltersBar clearAllTags={onClearAllTagFilter} clearTag={onClearTagFilter} />
                </div>
            </div>

            <div className="tutorials-header">
                <h2 className="tutorials-header-title">{t('TUTORIALS_TITLE')}</h2>
                <h3 className="tutorials-header-description">{t('TUTORIALS_DESCRIPTION')}</h3>
            </div>

            <TutorialsResultNumber
                totalNumber={totalNumber}
                countGroups={countGroups}
                countMissions={countMissions}
                countTutorials={countTutorials}
            />

            {!(loading || error || noResult) && (
                <div className="tutorials-content">
                    <div className="tutorials-content-wrapper">
                        {tutorials &&
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
                </div>
            )}

            {loading && <Loader label={t('TUTORIALS_LOADING_CONTENT')} />}
            {error && !loading && <WithError />}
            {noResult && !loading && <NoResult />}
            {totalPageCount > 1 && (
                <div className="tutorials-pagination">
                    <UIPagination
                        nextLabel={t('UI_PAGINATION_CAPTION_NEXT')}
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        pageCount={totalPageCount}
                        previousLabel={t('UI_PAGINATION_CAPTION_PREVIOUS')}
                        forcePage={pageOffset}
                    />
                </div>
            )}
        </div>
    );
};
