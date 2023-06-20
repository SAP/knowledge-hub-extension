import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';

import { initIcons } from '@sap-ux/ui-components';

import { tutorialsWithDataNoError } from '../../__mocks__/tutorials';
import { render } from '../../__mocks__/store.mock';

import { TaskType } from '../../../src/webview/components/TutorialCard/TaskType';

describe('TutorialCard > TaskType', () => {
    // Initialize and register ui-components icons and specific icon to LC
    initIcons();

    const renderTaskType = (type: string): RenderResult =>
        render(<TaskType type={type} />, { initialState: { tutorials: tutorialsWithDataNoError.result } });

    test('test if the TaskType render is ok', () => {
        const type = 'task-type-text';

        renderTaskType(type);

        const typeDOM = screen.getByText(/task-type-text/i);
        expect(typeDOM.className).toEqual('task-type-text');
    });
});
