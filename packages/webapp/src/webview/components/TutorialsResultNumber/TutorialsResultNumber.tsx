import React from 'react';
import type { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { UIBadge } from '../UI/UIBadge';

import './TutorialsResultNumber.scss';

export type TutorialsResultNumberProps = {
    totalNumber: number;
    countGroups: number;
    countMissions: number;
    countTutorials: number;
};

export const TutorialsResultNumber: FC<TutorialsResultNumberProps> = ({
    totalNumber,
    countGroups,
    countMissions,
    countTutorials
}): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div className="tutorials-result-number" data-testid="tutorials-result-number">
            {totalNumber > 0 && (
                <div className="tutorials-result-number__wrapper">
                    <UIBadge text={totalNumber} />{' '}
                    <span className="tutorials-result-number__wrapper__text">
                        {t('TUTORIALS_RESULT', { count: totalNumber })}
                    </span>
                </div>
            )}
            {countMissions > 0 && (
                <div className="tutorials-result-number__wrapper">
                    <UIBadge className="tutorials-result-number__wrapper__value" text={countMissions} />
                    <span className="tutorials-result-number__wrapper__text">
                        {t('TUTORIALS_RESULT_MISSION', { count: countMissions })}
                    </span>
                </div>
            )}
            {countGroups > 0 && (
                <div className="tutorials-result-number__wrapper">
                    <UIBadge className="tutorials-result-number__wrapper__value" text={countGroups} />
                    <span className="tutorials-result-number__wrapper__text">
                        {t('TUTORIALS_RESULT_GROUP', { count: countGroups })}
                    </span>
                </div>
            )}
            {countTutorials > 0 && (
                <div className="tutorials-result-number__wrapper">
                    <UIBadge className="tutorials-result-number__wrapper__value" text={countTutorials} />{' '}
                    <span className="tutorials-result-number__wrapper__text">
                        {t('TUTORIALS_RESULT_TUTORIAL', { count: countTutorials })}
                    </span>
                </div>
            )}
        </div>
    );
};
