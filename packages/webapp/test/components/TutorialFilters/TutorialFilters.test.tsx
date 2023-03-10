import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { initIcons } from '@sap-ux/ui-components';
import { initLCIcons } from '../../../src/webview/Icons/icons';

import { withDataNoErrorWithFilters } from '../../__mocks__/tutorials';
import { render } from '../../__mocks__/store.mock';

import { TutorialFilters } from '../../../src/webview/components/TutorialFilters/TutorialFilters';

describe('TutorialFilters', () => {
    // Initialize and register ui-components icons and specific icon to LC
    initIcons();
    initLCIcons();

    const renderTutorialFilters = (
        onClearAllTagFilter: {
            (): void;
            (): void;
        },
        onClearTagFilter: { (tagId: string): void; (tagId: string): void }
    ): RenderResult =>
        render(<TutorialFilters clearAllTags={onClearAllTagFilter} clearTag={onClearTagFilter} />, {
            initialState: { tutorials: withDataNoErrorWithFilters }
        });

    test('test if the TutorialFilters render is ok with data', () => {
        const onClearAllTagFilterfn = jest.fn();
        const onClearTagFilterfn = jest.fn();

        renderTutorialFilters(onClearAllTagFilterfn, onClearTagFilterfn);

        const filteredHeaderDOM = screen.getByText(/TUTORIALS_FILTERS_FILTERED_BY/i);
        expect(filteredHeaderDOM.className).toEqual('tutorial-filters-header-title');

        const listOfFilterPill = screen.getByTestId('tutorial-filters-list-of-pill').querySelectorAll('.ui-pill');
        expect(listOfFilterPill.length).toEqual(3);

        const clearAllDOM = screen.getByText(/TUTORIALS_FILTERS_CLEAR_ALL/i);
        expect(clearAllDOM.className).toMatch(/tutorial-filters-clear/);
    });

    test('test if the TutorialFilters render is ok when the clear all filters is clicked', () => {
        const onClearAllTagFilterfn = jest.fn();
        const onClearTagFilterfn = jest.fn();

        renderTutorialFilters(onClearAllTagFilterfn, onClearTagFilterfn);

        const listOfFilterPill = screen.getByTestId('tutorial-filters-list-of-pill').querySelectorAll('.ui-pill');
        expect(listOfFilterPill.length).toEqual(3);

        const clearAllDOM = screen.getByText(/TUTORIALS_FILTERS_CLEAR_ALL/i);
        expect(clearAllDOM.className).toMatch(/tutorial-filters-clear/);

        if (clearAllDOM) {
            act(() => {
                clearAllDOM.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });
            expect(onClearAllTagFilterfn).toHaveBeenCalled();
        }
    });

    test('test if the TutorialFilters render is ok when the clear all filters is clicked', () => {
        const onClearAllTagFilterfn = jest.fn();
        const onClearTagFilterfn = jest.fn();

        renderTutorialFilters(onClearAllTagFilterfn, onClearTagFilterfn);

        const listOfFilterPill = screen.getByTestId('tutorial-filters-list-of-pill').querySelectorAll('.ui-pill');
        expect(listOfFilterPill.length).toEqual(3);

        const clearAllDOM = screen.getByText(/TUTORIALS_FILTERS_CLEAR_ALL/i);
        expect(clearAllDOM.className).toMatch(/tutorial-filters-clear/);

        if (clearAllDOM) {
            act(() => {
                clearAllDOM.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });
            expect(onClearAllTagFilterfn).toHaveBeenCalled();
        }
    });

    test('test if the TutorialFilters render is ok when one of the filter clear icon is clicked', () => {
        const onClearAllTagFilterfn = jest.fn();
        const onClearTagFilterfn = jest.fn();

        renderTutorialFilters(onClearAllTagFilterfn, onClearTagFilterfn);

        let listOfFilterPill = screen
            .getByTestId('tutorial-filters-list-of-pill')
            .querySelectorAll('.ui-pill-icon-container');
        expect(listOfFilterPill.length).toEqual(3);

        if (listOfFilterPill) {
            act(() => {
                listOfFilterPill[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });
            expect(onClearTagFilterfn).toHaveBeenCalled();
        }
    });
});
