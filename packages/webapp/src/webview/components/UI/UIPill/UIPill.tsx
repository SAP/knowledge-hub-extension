import React from 'react';
import type { FC } from 'react';

import { UIIcon } from '@sap-ux/ui-components';

import './UIPill.scss';

export type UIPillProps = {
    pillLabel: string;
    pillId: string;
    callback(pillId: string): void;
    clearButton?: boolean;
};

export const UIPill: FC<UIPillProps> = ({ pillLabel, pillId, callback, clearButton }: UIPillProps): JSX.Element => {
    const isEditable = clearButton ?? true;
    return (
        <div className="ui-pill">
            <div
                className={[
                    'ui-pill-name ui-small-text',
                    isEditable ? 'ui-pill-name__with-icon' : 'ui-pill-name__no-icon'
                ]
                    .filter((x) => !!x)
                    .join(' ')}>
                {pillLabel}
            </div>
            {isEditable && (
                <div className="ui-pill-icon">
                    <div
                        className="ui-pill-icon-container"
                        data-testid={`ui-pill-${pillLabel.replace(/\s+/g, '-').toLowerCase()}`}
                        onClick={() => callback(pillId)}>
                        <UIIcon iconName="clear" className="ui-pill-icon-svg" />
                    </div>
                </div>
            )}
        </div>
    );
};
