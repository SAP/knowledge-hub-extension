import React, { useState, useEffect, useCallback } from 'react';
import type { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MOTION_VARIANTS_PAGE } from '../../constants';
import type {
    TutorialsState,
    TutorialsEntry,
    TutorialsSearchQuery,
    TutorialsTags,
    TutorialsFacets
} from '@sap/knowledge-hub-extension-types';
import { TUTORIALS_LIMIT_PER_PAGE } from '@sap/knowledge-hub-extension-types';

import { tutorialsPageChanged, tutorialsFiltersTagsResetWith } from '../../store/actions';
import { store, useAppSelector } from '../../store';
import { getTutorials, getTutorialsQuery } from './Tutorials.slice';
import { getTutorialsTag, onTagSelected, fetchTutorialsData } from './Tutorials.utils';

import type { UIPaginationSelected } from '../../components/UI/UIPagination';
import { UIPagination } from '../../components/UI/UIPagination';
import { TutorialCard } from '../../components/TutorialCard';
import { TutorialsResultNumber } from '../../components/TutorialsResultNumber';
import { TutorialsFiltersMenu } from '../../components/TutorialsFiltersMenu';
import { TutorialsFiltersBar } from '../../components/TutorialsFiltersBar';
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

    const handlePageClick = useCallback(
        (event: UIPaginationSelected) => {
            const options: TutorialsSearchQuery = Object.assign({}, activeQuery, { start: event.selected });

            dispatch(tutorialsPageChanged(event.selected));
            setPageOffset(event.selected);

            fetchTutorialsData(options);
        },
        [activeQuery]
    );

    useEffect(() => {
        const state = store.getState();
        const currentQuery = state.tutorials.query;
        const options: TutorialsSearchQuery = Object.assign({}, currentQuery);

        let limit;

        if (activeTutorials.error.isError) {
            setTotalPageCount(0);
            setLoading(false);
            setNoResult(true);
            setError(true);
        } else if (!activeTutorials.pending) {
            if (location.state?.tagId) {
                const tagId = location.state.tagId;
                dispatch(tutorialsFiltersTagsResetWith(tagId));

                options.filters = [tagId];
                fetchTutorialsData(options);
                navigate(location.pathname, { replace: true });
            }

            if (activeTutorials && activeTutorials.result.data.numFound > 0) {
                setTutorials(activeTutorials.result.data.result);
                setTotalNumber(activeTutorials.result.data.numFound);
                setCountGroups(activeTutorials.result.data.countGroups);
                setCountMissions(activeTutorials.result.data.countMissions);
                setCountTutorials(activeTutorials.result.data.countTutorials);
                setFacets(activeTutorials.result.data.facets);
                setTags(activeTutorials.result.data.tags);

                if (activeQuery.rows) {
                    limit = activeTutorials.result.data.numFound / activeQuery.rows;
                } else {
                    limit = activeTutorials.result.data.numFound / TUTORIALS_LIMIT_PER_PAGE;
                }
                setTotalPageCount(Math.ceil(limit));

                setLoading(false);
                setNoResult(false);
                setError(activeTutorials.error.isError);
            } else if (activeTutorials.result.data.numFound === 0) {
                setTotalPageCount(0);
                setLoading(false);
                setNoResult(true);
            } else if (activeTutorials.result.data.numFound === -1) {
                setLoading(true);
                setNoResult(false);
                fetchTutorialsData(options);
            }
        }
    }, [activeTutorials]);

    return (
        <motion.div
            className="tutorials"
            custom={{ direction: 'forward' }}
            initial="initial"
            animate="getIn"
            exit="getOut"
            variants={MOTION_VARIANTS_PAGE}>
            <div className="tutorials-filters">
                <div className="tutorials-filters-wrapper">
                    <TutorialsFiltersMenu facets={facets} tags={tags} loading={loading} />
                    <TutorialsFiltersBar />
                </div>
            </div>

            <div className="tutorials-header">
                <h2 className="ui-large-header tutorials-header-title">{t('TUTORIALS_TITLE')}</h2>
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
                        {tutorials?.map((tutorial, _) => {
                            return (
                                <TutorialCard
                                    key={tutorial.imsId}
                                    tutorial={tutorial}
                                    tag={getTutorialsTag(tutorial.primaryTag, activeTutorials.result.data)}
                                    tags={activeTutorials.result.data.tags}
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
        </motion.div>
    );
};
