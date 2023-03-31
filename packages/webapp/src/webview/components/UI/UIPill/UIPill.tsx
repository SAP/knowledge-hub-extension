import React from 'react';
import type { FC } from 'react';

import { UIIcon } from '@sap-ux/ui-components';

import './UIPill.scss';

export type UIPillProps = {
    pillLabel: string;
    pillId: string;
    callback(pillId: string): void;
};

export const UIPill: FC<UIPillProps> = ({ pillLabel, pillId, callback }: UIPillProps): JSX.Element => {
    return (
        <div className="ui-pill">
            <div className="ui-pill-name ui-small-text">{pillLabel}</div>
            <div className="ui-pill-icon">
                <div
                    className="ui-pill-icon-container"
                    data-testid={`ui-pill-${pillLabel.replace(/\s+/g, '-').toLowerCase()}`}
                    onClick={() => callback(pillId)}>
                    <UIIcon iconName="clear" className="ui-pill-icon-svg" />
                </div>
            </div>
        </div>
    );
};
