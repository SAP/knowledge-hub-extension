import React from 'react';
import type { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { TutorialsFacets, TutorialsTags, TUTORIALS_FILTERS_LABELS } from '@sap/knowledge-hub-extension-types';
import { TutorialFiltersMenuEntries } from './TutorialFiltersMenuEntries';

import './TutorialFiltersMenu.scss';

export type TutorialFiltersMenuProps = {
    facets: TutorialsFacets;
    tags: TutorialsTags;
    onSelectedTag(tag: string): void;
};

export const TutorialFiltersMenu: FC<TutorialFiltersMenuProps> = ({ facets, tags, onSelectedTag }): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div data-testid="tutorial-filters-menu" className="tutorial-filters-menu">
            <div className="tutorial-filters-menu__title ui-medium-header">{t('TUTORIALS_FILTER_MENU_TITLE')}</div>
            <div className="tutorial-filters-menu__entries">
                {Object.keys(facets).map((title: string, index: number) => {
                    let withSearchOn = true;
                    let isSmall = false;
                    if (title === TUTORIALS_FILTERS_LABELS.Experience || title === TUTORIALS_FILTERS_LABELS.Type) {
                        withSearchOn = false;
                        isSmall = true;
                    }
                    return (
                        <TutorialFiltersMenuEntries
                            key={title}
                            title={title}
                            entries={facets[title]}
                            tags={tags}
                            withSearchOn={withSearchOn}
                            isSmall={isSmall}
                            onSelectedTag={onSelectedTag}
                        />
                    );
                })}
            </div>
        </div>
    );
};
