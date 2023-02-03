import React from 'react';
import type { FC } from 'react';
import { UIIcon } from '@sap-ux/ui-components';

import './Experience.scss';

type ExperienceProps = {
    experience: string;
};

export const Experience: FC<ExperienceProps> = ({ experience }: ExperienceProps): JSX.Element => {
    return (
        <div className="experience">
            <UIIcon iconName={experience} />
            <span className="experience-text">{experience}</span>
        </div>
    );
};
