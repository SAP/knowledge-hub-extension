import React from 'react';
import type { FC } from 'react';

import { useTranslation } from 'react-i18next';

import { UIBadge } from '../UI/UIBadge';

import './BlogsResultNumber.scss';

export type BlogsResultNumberProps = {
    totalNumber: number;
};

export const BlogsResultNumber: FC<BlogsResultNumberProps> = ({ totalNumber }): JSX.Element => {
    const { t } = useTranslation();

    return (
        <div className="blogs-result-number" data-testid="blogs-result-number">
            {totalNumber > 0 && (
                <div className="blogs-result-number__wrapper">
                    <UIBadge text={totalNumber} />{' '}
                    <span className="blogs-result-number__wrapper__text">{t('BLOGS_RESULT')}</span>
                </div>
            )}
        </div>
    );
};
