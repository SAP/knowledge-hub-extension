import React from 'react';
import type { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { UIBadge } from '../UI/UIBadge';

import './TutorialResultNumber.scss';

export type TutorialResultNumberProps = {
    totalNumber: number;
    countGroups: number;
    countMissions: number;
    countTutorials: number;
};

export const TutorialResultNumber: FC<TutorialResultNumberProps> = ({
    totalNumber,
    countGroups,
    countMissions,
    countTutorials
}): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div className="tutorial-result-number" data-testid="tutorial-result-number">
            {!!totalNumber && (
                <div className="tutorial-result-number__wrapper">
                    <UIBadge text={totalNumber} />{' '}
                    <span className="tutorial-result-number__wrapper__text">{t('TUTORIALS_RESULT')}</span>
                </div>
            )}
            {!!countMissions && (
                <div className="tutorial-result-number__wrapper">
                    <UIBadge className="tutorial-result-number__wrapper__value" text={countMissions} />
                    <span className="tutorial-result-number__wrapper__text">Mission</span>
                </div>
            )}
            {!!countGroups && (
                <div className="tutorial-result-number__wrapper">
                    <UIBadge className="tutorial-result-number__wrapper__value" text={countGroups} />
                    <span className="tutorial-result-number__wrapper__text">Group</span>
                </div>
            )}
            {!!countTutorials && (
                <div className="tutorial-result-number__wrapper">
                    <UIBadge className="tutorial-result-number__wrapper__value" text={countTutorials} />{' '}
                    <span className="tutorial-result-number__wrapper__text">Tutorial</span>
                </div>
            )}
        </div>
    );
};
