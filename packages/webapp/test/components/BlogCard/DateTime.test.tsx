import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { initIcons } from '@sap-ux/ui-components';
import { initLCIcons } from '../../../src/webview/Icons/icons';

import { render } from '../../../test/__mocks__/store.mock';

import { DateTime } from '../../../src/webview/components/BlogCard/DateTime';

describe('BlogCard > DateTime', () => {
    // Initialize and register ui-components icons and specific icon to LC
    initIcons();
    initLCIcons();

    const renderDateTime = (createdDate: Date, updatedDate: Date): RenderResult =>
        render(<DateTime createdDate={createdDate} updatedDate={updatedDate} />);

    test('test if the DateTime text is rendered, createdDate = updatedDate', () => {
        const myDate = new Date();
        const createdDate = myDate;
        const updatedDate = myDate;

        act(() => {
            renderDateTime(createdDate, updatedDate);
        });

        const dateTimeTitleDOM = screen.getByText(/PUBLISHED/i);
        expect(dateTimeTitleDOM).toBeTruthy();
        expect(dateTimeTitleDOM.className).toEqual('date-time-description');
    });

    test('test if the DateTime text is rendered, createdDate < updatedDate', () => {
        const createdDate = new Date('2000-01-01');
        const updatedDate = new Date('2000-01-10');

        act(() => {
            renderDateTime(createdDate, updatedDate);
        });

        const dateTimeTitleDOM = screen.getByText(/UPDATED/i);
        expect(dateTimeTitleDOM).toBeTruthy();
        expect(dateTimeTitleDOM.className).toEqual('date-time-description');
    });
});
