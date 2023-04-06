import React from 'react';
import type { FC } from 'react';
import { UIIcon } from '@sap-ux/ui-components';

import './TaskType.scss';

type TaskTypeProps = {
    type: string;
};

export const TaskType: FC<TaskTypeProps> = ({ type }: TaskTypeProps): JSX.Element => {
    return (
        <div className="task-type">
            <UIIcon iconName="task" />
            <span className="task-type-text">{type}</span>
        </div>
    );
};
