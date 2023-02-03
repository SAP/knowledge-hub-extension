import React from 'react';
import type { FC } from 'react';
import { UIIcon } from '@sap-ux/ui-components';
import type { TutorialsTags } from '@sap/knowledge-hub-extension-types';

import './TaskType.scss';

type TaskTypeProps = {
    type: string;
    tags?: TutorialsTags;
};

export const TaskType: FC<TaskTypeProps> = ({ type, tags }: TaskTypeProps): JSX.Element => {
    return (
        <div className="task-type">
            <UIIcon iconName="task" />
            <span className="task-type-text">{tags && tags[type].title}</span>
        </div>
    );
};
