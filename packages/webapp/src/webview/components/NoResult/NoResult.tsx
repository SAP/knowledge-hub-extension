import React from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import './NoResult.scss';

export const NoResult: FC = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div className="no-result">
            <div className="no-result-title ui-large-header">{t('NO_RESULT_TITLE')}</div>
            <div className="no-result-sub-title ui-medium-text">{t('NO_RESULT_DESCRIPTION')}</div>
        </div>
    );
};
