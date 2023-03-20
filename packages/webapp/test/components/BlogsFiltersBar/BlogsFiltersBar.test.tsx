import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { initIcons } from '@sap-ux/ui-components';
import { initLCIcons } from '../../../src/webview/Icons/icons';

import { queryWithFilter, tagsWithData, filtersWithData } from '../../__mocks__/blogs';
import { render } from '../../__mocks__/store.mock';

import { BlogsFiltersBar } from '../../../src/webview/components/BlogsFiltersBar/BlogsFiltersBar';

describe('BlogsFiltersBar', () => {
    // Initialize and register ui-components icons and specific icon to LC
    initIcons();
    initLCIcons();

    const renderBlogsFiltersBar = (): RenderResult =>
        render(<BlogsFiltersBar />, {
            initialState: {
                blogs: { query: queryWithFilter, tags: tagsWithData, ui: { filtersEntries: filtersWithData } }
            }
        });

    test('test if the BlogsFiltersBar render is ok with data', () => {
        renderBlogsFiltersBar();

        const filteredHeaderDOM = screen.getByText(/BLOGS_FILTERS_BAR_FILTERED_BY/i);
        expect(filteredHeaderDOM.className).toEqual('blogs-filters-bar-header-title');

        const listOfFilterPill = screen.getByTestId('blogs-filters-bar-list-of-pill').querySelectorAll('.ui-pill');
        expect(listOfFilterPill.length).toEqual(4);

        const clearAllDOM = screen.getByText(/BLOGS_FILTERS_BAR_CLEAR_ALL/i);
        expect(clearAllDOM.className).toContain('blogs-filters-bar-clear');
    });

    test('test if the BlogsFiltersBar render is ok when the clear all filters is clicked', () => {
        renderBlogsFiltersBar();

        expect(() => screen.getByTestId('blogs-filters-bar')).not.toThrow();
        const listOfFilterPill = screen.getByTestId('blogs-filters-bar-list-of-pill').querySelectorAll('.ui-pill');
        expect(listOfFilterPill.length).toEqual(4);

        const clearAllDOM = screen.getByText(/BLOGS_FILTERS_BAR_CLEAR_ALL/i);
        expect(clearAllDOM.className).toContain('blogs-filters-bar-clear');

        if (clearAllDOM) {
            act(() => {
                clearAllDOM.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });

            expect(() => screen.getByTestId('blogs-filters-bar')).toThrow();
        }
    });

    test('test if the BlogsFiltersBar render is ok when one of the filter clear icon is clicked', () => {
        act(() => {
            renderBlogsFiltersBar();
        });

        expect(() => screen.getByTestId('blogs-filters-bar')).not.toThrow();
        const listOfFilterPill = screen.getByTestId('blogs-filters-bar-list-of-pill').querySelectorAll('.ui-pill');
        expect(listOfFilterPill.length).toEqual(4);

        if (listOfFilterPill) {
            const pill1 = screen.getByTestId('ui-pill-tag-1');
            act(() => {
                pill1.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });

            const listOfFilterPillAfter = screen
                .getByTestId('blogs-filters-bar-list-of-pill')
                .querySelectorAll('.ui-pill');

            expect(listOfFilterPillAfter.length).toEqual(3);
        }
    });
});
