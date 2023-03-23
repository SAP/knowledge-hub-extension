import React from 'react';
import type { FC } from 'react';

import { TutorialsUiState } from '@sap/knowledge-hub-extension-types';

import { useAppSelector } from '../../store';
import { getTutorialsUI } from '../../features/tutorials/Tutorials.slice';

import { TutorialsFacets, TutorialsTags, TUTORIALS_FILTERS_LABELS } from '@sap/knowledge-hub-extension-types';
import { TutorialsFiltersMenuEntries } from './TutorialsFiltersMenuEntries';

import './TutorialsFiltersMenu.scss';

export type TutorialsFiltersMenuProps = {
    facets: TutorialsFacets;
    tags: TutorialsTags;
    onSelectedTag(tag: string): void;
    onClearedTag(tag: string): void;
};

export const TutorialsFiltersMenu: FC<TutorialsFiltersMenuProps> = ({
    facets,
    tags,
    onSelectedTag,
    onClearedTag
}): JSX.Element => {
    const activeUi: TutorialsUiState = useAppSelector(getTutorialsUI);

    return (
        <div
            className={[
                'tutorials-filters-menu',
                activeUi.isFiltersMenuOpened ? 'tutorials-filters-menu__opened' : 'tutorials-filters-menu__closed'
            ]
                .filter((x) => !!x)
                .join(' ')}>
            <div data-testid="tutorials-filters-menu__content" className="tutorials-filters-menu__content">
                <div className="tutorials-filters-menu__content__entries">
                    {Object.keys(facets).map((title: string, index: number) => {
                        let withSearchOn = true;
                        let isSmall = false;
                        if (title === TUTORIALS_FILTERS_LABELS.Experience || title === TUTORIALS_FILTERS_LABELS.Type) {
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
                                onSelectedTag={onSelectedTag}
                                onClearedTag={onClearedTag}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
