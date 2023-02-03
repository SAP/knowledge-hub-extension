import React from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import './WithError.scss';

export const WithError: FC = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div className="with-error">
            <div className="with-error-title ui-large-header">{t('WITH_ERROR_TITLE')}</div>
            <div className="with-error-sub-title ui-medium-text">{t('WITH_ERROR_DESCRIPTION')}</div>
        </div>
    );
};
