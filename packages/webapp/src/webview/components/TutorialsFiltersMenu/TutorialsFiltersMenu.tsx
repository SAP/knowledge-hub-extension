import React from 'react';
import type { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import {
    TutorialsUiState,
    TutorialsFacets,
    TutorialsTags,
    TUTORIALS_FILTERS_LABELS
} from '@sap/knowledge-hub-extension-types';

import { MOTION_VARIANTS_MENU } from '../../constants';

import { useAppSelector } from '../../store';
import { getTutorialsUI } from '../../features/tutorials/Tutorials.slice';

import { TutorialsFiltersMenuEntries } from './TutorialsFiltersMenuEntries';

import './TutorialsFiltersMenu.scss';

export type TutorialsFiltersMenuProps = {
    facets: TutorialsFacets;
    tags: TutorialsTags;
    loading: boolean;
};

export const TutorialsFiltersMenu: FC<TutorialsFiltersMenuProps> = ({ facets, tags, loading }): JSX.Element => {
    const activeUi: TutorialsUiState = useAppSelector(getTutorialsUI);

    return (
        <AnimatePresence initial={false}>
            {activeUi.isFiltersMenuOpened && (
                <motion.div
                    className="tutorials-filters-menu"
                    custom={{ direction: 'forward' }}
                    initial="initial"
                    animate="getIn"
                    exit="getOut"
                    variants={MOTION_VARIANTS_MENU}>
                    <div data-testid="tutorials-filters-menu__content" className="tutorials-filters-menu__content">
                        <div className="tutorials-filters-menu__content__entries">
                            {Object.keys(facets).map((title: string, index: number) => {
                                let withSearchOn = true;
                                let isSmall = false;
                                if (
                                    title === TUTORIALS_FILTERS_LABELS.Experience ||
                                    title === TUTORIALS_FILTERS_LABELS.Type
                                ) {
                                    withSearchOn = false;
                                    isSmall = true;
                                }
                                return (
                                    <TutorialsFiltersMenuEntries
                                        key={title}
                                        title={title}
                                        entries={facets[title]}
                                        tags={tags}
                                        withSearchOn={withSearchOn}
                                        isSmall={isSmall}
                                        loading={loading}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
