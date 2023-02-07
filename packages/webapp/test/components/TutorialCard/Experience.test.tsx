import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';

import { initIcons } from '@sap-ux/ui-components';
import { initLCIcons } from '../../../src/webview/Icons/icons';

import { withDataNoError } from '../../__mocks__/tutorials';
import { render } from '../../__mocks__/store.mock';

import { Experience } from '../../../src/webview/components/TutorialCard/Experience';

describe('TutorialCard > Experience', () => {
    // Initialize and register ui-components icons and specific icon to LC
    initIcons();
    initLCIcons();

    const renderExperience = (experience: string): RenderResult =>
        render(<Experience experience={experience} />, { initialState: { tutorials: withDataNoError } });

    test('test if the Experience render is ok', () => {
        const experience =
            'c1a376dd-ebd0-4787-804e-a23fef23ba06:4625ac99-30b5-4df6-a6c5-f840dd406e80/d64acece-d95f-47a5-9e70-71c487db6c5a';
        const tags = {
            'c1a376dd-ebd0-4787-804e-a23fef23ba06:4625ac99-30b5-4df6-a6c5-f840dd406e80/d64acece-d95f-47a5-9e70-71c487db6c5a':
                {
                    title: 'Beginner',
                    tagTitle: 'tutorial:experience/beginner'
                }
        };
        renderExperience(tags[experience].title);

        const experienceDOM = screen.getByText(/Beginner/i);

        expect(experienceDOM.className).toEqual('experience-text');
    });
});
