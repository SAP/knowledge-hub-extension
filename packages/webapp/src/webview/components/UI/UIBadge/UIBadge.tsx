import React from 'react';
import type { FC } from 'react';

import './UIBadge.scss';

export type UIBadgeProps = {
    text: string | number;
    className?: string;
};

export const UIBadge: FC<UIBadgeProps> = ({ text, className }: UIBadgeProps): JSX.Element => {
    return (
        <div className={['ui-badge', className ? className : ''].filter((x) => !!x).join(' ')}>
            <div className="ui-badge-text ui-small-text">{text}</div>
        </div>
    );
};
