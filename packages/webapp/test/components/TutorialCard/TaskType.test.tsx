import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';

import type { TutorialsTags } from '@sap/knowledge-hub-extension-types';

import { initIcons } from '@sap-ux/ui-components';
import { initLCIcons } from '../../../src/webview/Icons/icons';

import { withDataNoError } from '../../__mocks__/tutorials';
import { render } from '../../__mocks__/store.mock';

import { TaskType } from '../../../src/webview/components/TutorialCard/TaskType';

describe('TutorialCard > TaskType', () => {
    // Initialize and register ui-components icons and specific icon to LC
    initIcons();
    initLCIcons();

    const renderTaskType = (type: string, tags: TutorialsTags): RenderResult =>
        render(<TaskType type={type} tags={tags} />, { initialState: { tutorials: withDataNoError } });

    test('test if the TaskType render is ok', () => {
        const type =
            'c1a376dd-ebd0-4787-804e-a23fef23ba06:b79e26e3-025a-455b-a9e5-3047ed76bad2/3245916d-3b2b-4818-8611-5beaff01a2f8';
        const tags = {
            'c1a376dd-ebd0-4787-804e-a23fef23ba06:b79e26e3-025a-455b-a9e5-3047ed76bad2/3245916d-3b2b-4818-8611-5beaff01a2f8':
                {
                    tagAlternativeTitles: [],
                    title: 'Group',
                    tagTitle: 'tutorial:type/group'
                }
        };

        renderTaskType(type, tags);

        const typeDOM = screen.getByText(/Group/i);
        expect(typeDOM.className).toEqual('task-type-text');
    });
});
