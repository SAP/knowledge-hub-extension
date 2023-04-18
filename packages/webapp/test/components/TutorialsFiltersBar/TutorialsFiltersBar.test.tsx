import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { initIcons } from '@sap-ux/ui-components';
import { initLCIcons } from '../../../src/webview/Icons/icons';

import { withDataNoErrorWithFilters } from '../../__mocks__/tutorials';
import { render } from '../../__mocks__/store.mock';

import { TutorialsFiltersBar } from '../../../src/webview/components/TutorialsFiltersBar/TutorialsFiltersBar';

describe('TutorialsFiltersBar', () => {
    // Initialize and register ui-components icons and specific icon to LC
    initIcons();
    initLCIcons();

    const renderTutorialsFiltersBar = (): RenderResult =>
        render(<TutorialsFiltersBar />, {
            initialState: { tutorials: withDataNoErrorWithFilters }
        });

    test('test if the TutorialsFiltersBar render is ok with data', () => {
        renderTutorialsFiltersBar();

        const filteredHeaderDOM = screen.getByText(/TUTORIALS_FILTERS_BAR_FILTERED_BY/i);
        expect(filteredHeaderDOM.className).toEqual('tutorials-filters-bar-header-title');

        const listOfFilterPill = screen.getByTestId('tutorials-filters-bar-list-of-pill').querySelectorAll('.ui-pill');
        expect(listOfFilterPill.length).toEqual(3);

        const clearAllDOM = screen.getByText(/TUTORIALS_FILTERS_BAR_CLEAR_ALL/i);
        expect(clearAllDOM.className).toContain('ms-Button-label');
    });

    test('test if the TutorialsFiltersBar render is ok when the clear all filters is clicked', () => {
        renderTutorialsFiltersBar();

        const listOfFilterPill = screen.getByTestId('tutorials-filters-bar-list-of-pill').querySelectorAll('.ui-pill');
        expect(listOfFilterPill.length).toEqual(3);

        const clearAllDOM = screen.getByText(/TUTORIALS_FILTERS_BAR_CLEAR_ALL/i);
        expect(clearAllDOM.className).toContain('ms-Button-label');

        if (clearAllDOM) {
            act(() => {
                clearAllDOM.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });
            expect(() => screen.getByTestId('tutorials-filters-bar')).toThrow();
        }
    });

    test('test if the TutorialsFiltersBar render is ok when one of the filter clear icon is clicked', () => {
        renderTutorialsFiltersBar();

        let listOfFilterPill = screen
            .getByTestId('tutorials-filters-bar-list-of-pill')
            .querySelectorAll('.ui-pill-icon-container');
        expect(listOfFilterPill.length).toEqual(3);

        if (listOfFilterPill) {
            act(() => {
                listOfFilterPill[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });
        }
    });
});
