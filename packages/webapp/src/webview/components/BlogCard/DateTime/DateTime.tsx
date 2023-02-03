import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import './DateTime.scss';

type DateTimeProps = {
    createdDate: Date;
    updatedDate: Date;
};

export const DateTime: FC<DateTimeProps> = ({ createdDate, updatedDate }: DateTimeProps): JSX.Element => {
    const { t } = useTranslation();

    const RELATIVE_DATE_INTERVAL_DAYS = 1;
    const DATE_FORMAT = 'MMM D, YYYY';
    const TITLE_DATE_FORMAT = 'MMM D, YYYY h:mm:ss a';

    const [verb, setVerb] = useState<string>('');
    const [relative, setRelative] = useState<boolean>(true);
    const [dateToUse, setDateToUse] = useState<moment.Moment>(moment.utc());
    const [dateFormat, setDateFormat] = useState<string | undefined>('');

    useEffect(() => {
        const useCreatedDate = createdDate === updatedDate;
        const date = useCreatedDate ? createdDate : updatedDate;
        const verb = useCreatedDate ? t('PUBLISHED') : t('UPDATED');

        const dateToUse = moment.utc(date);
        const now = moment();
        const useRelative = RELATIVE_DATE_INTERVAL_DAYS > now.diff(dateToUse, 'day');
        const dateFormat = useRelative ? undefined : DATE_FORMAT;

        setVerb(verb);
        setDateToUse(dateToUse);
        setRelative(useRelative);
        setDateFormat(dateFormat);
    }, [createdDate, updatedDate]);

    return (
        <div className="date-time">
            <span className="date-time-description">{verb}</span>
            <span className="date-time-value">
                <Moment fromNow={relative} format={dateFormat} titleFormat={TITLE_DATE_FORMAT} withTitle={true}>
                    {dateToUse}
                </Moment>
            </span>
        </div>
    );
};
