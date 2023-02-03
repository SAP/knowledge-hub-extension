import React from 'react';
import type { FC } from 'react';

import { useTranslation } from 'react-i18next';

import './Videos.scss';

export const Videos: FC = (): JSX.Element => {
    const { t } = useTranslation();

    /**
     * TODO: Add Videos content
     */
    return (
        <div className="videos">
            <div className="videos-header">
                <h2 className="videos-header-title">{t('VIDEOS_TITLE')}</h2>
                <h3 className="videos-header-description">{t('VIDEOS_DESCRIPTION')}</h3>
            </div>
            <div className="videos-content"></div>
        </div>
    );
};
