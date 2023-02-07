import React from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { UIIcon } from '@sap-ux/ui-components';

import './Featured.scss';

export const Featured: FC = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div className="featured">
            <UIIcon iconName="featured" />
            <span className="featured-text">{t('TUTORIALS_FEATURED')}</span>
        </div>
    );
};
