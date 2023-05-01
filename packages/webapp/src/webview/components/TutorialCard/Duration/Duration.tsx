import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { UIIcon } from '@sap-ux/ui-components';

import './Duration.scss';

type DurationProps = {
    duration: string;
};

export const Duration: FC<DurationProps> = ({ duration }: DurationProps): JSX.Element => {
    const { t } = useTranslation();
    const [minutes, setMinutes] = useState<number>(0);
    const [hours, setHours] = useState<number>(0);

    useEffect(() => {
        const timeHM = moment
            .utc(moment.duration(parseInt(duration, 10), 'seconds').asMilliseconds())
            .format('h,m')
            .split(',');
        setMinutes(parseInt(timeHM[1], 10));
        setHours(parseInt(timeHM[0], 10));
    }, [duration]);

    return (
        <div className="duration">
            <UIIcon iconName="ClockShort" />
            <span className="duration-text">
                {hours !== 0 && hours !== 12 && (
                    <div className="duration-text-hours">
                        <span className="duration-text-hours-value">{hours}</span>
                        <span>{t('TUTORIALS_DURATION_HOUR')}</span>
                    </div>
                )}
                {minutes !== 0 && (
                    <div className="duration-text-minutes">
                        <span className="duration-text-minutes-value">{minutes}</span>
                        <span>{t('TUTORIALS_DURATION_MINUTE')}</span>
                    </div>
                )}
            </span>
        </div>
    );
};
