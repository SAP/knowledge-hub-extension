import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';

import { initIcons } from '@sap-ux/ui-components';

import { render } from '../../__mocks__/store.mock';
import { Duration } from '../../../src/webview/components/TutorialCard/Duration';

describe('TutorialCard > Duration', () => {
    // Initialize and register ui-components icons and specific icon to LC
    initIcons();

    const renderDuration = (testTime: string): RenderResult => render(<Duration duration={testTime} />);

    test('test if the hours are ok', () => {
        const testTime = '6000';
        renderDuration(testTime);
        const hour = screen.getByText(/1/i);
        const min = screen.getByText(/40/i);
        expect(hour.className).toEqual('duration-text-hours-value');
        expect(min.className).toEqual('duration-text-minutes-value');
    });

    test('test if the minutes are ok', () => {
        const testTime = '300';
        renderDuration(testTime);
        const min = screen.getByText(/5/i);
        expect(min.className).toEqual('duration-text-minutes-value');
    });
});
