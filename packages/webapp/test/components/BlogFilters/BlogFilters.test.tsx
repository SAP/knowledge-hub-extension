import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import type { BlogsManagedTag } from '@sap/knowledge-hub-extension-types';
import { initIcons } from '@sap-ux/ui-components';
import { initLCIcons } from '../../../src/webview/Icons/icons';

import { tagsWithData, managedTagsWithData } from '../../../test/__mocks__/blogs';
import { render } from '../../../test/__mocks__/store.mock';

import { BlogFilters } from '../../../src/webview/components/BlogFilters/BlogFilters';

describe('BlogFilters', () => {
    // Initialize and register ui-components icons and specific icon to LC
    initIcons();
    initLCIcons();

    const renderBlogFilters = (
        onClearAllTagFilter: {
            (): void;
            (): void;
        },
        onClearTagFilter: { (tagId: string): void; (tagId: string): void }
    ): RenderResult =>
        render(<BlogFilters clearAllTags={onClearAllTagFilter} clearTag={onClearTagFilter} />, {
            initialState: { blogs: { tags: tagsWithData, query: { managedTags: managedTagsWithData } } }
        });

    test('test if the BlogFilters render is ok with data', () => {
        const onClearAllTagFilterfn = jest.fn();
        const onClearTagFilterfn = jest.fn();

        renderBlogFilters(onClearAllTagFilterfn, onClearTagFilterfn);

        const filteredHeaderDOM = screen.getByText(/BLOGS_FILTERS_FILTERED_BY/i);
        expect(filteredHeaderDOM.className).toEqual('blog-filters-header-title');

        const listOfFilterPill = screen.getByTestId('blog-filters-list-of-pill').querySelectorAll('.ui-pill');
        expect(listOfFilterPill.length).toEqual(2);

        const clearAllDOM = screen.getByText(/BLOGS_FILTERS_CLEAR_ALL/i);
        expect(clearAllDOM.className).toMatch(/blog-filters-clear/);
    });

    test('test if the BlogFilters render is ok when the clear all filters is clicked', () => {
        const onClearAllTagFilterfn = jest.fn();
        const onClearTagFilterfn = jest.fn();

        renderBlogFilters(onClearAllTagFilterfn, onClearTagFilterfn);

        const listOfFilterPill = screen.getByTestId('blog-filters-list-of-pill').querySelectorAll('.ui-pill');
        expect(listOfFilterPill.length).toEqual(2);

        const clearAllDOM = screen.getByText(/BLOGS_FILTERS_CLEAR_ALL/i);
        expect(clearAllDOM.className).toMatch(/blog-filters-clear/);

        if (clearAllDOM) {
            act(() => {
                clearAllDOM.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });
            expect(onClearAllTagFilterfn).toHaveBeenCalled();
        }
    });

    test('test if the BlogFilters render is ok when the clear all filters is clicked', () => {
        const onClearAllTagFilterfn = jest.fn();
        const onClearTagFilterfn = jest.fn();

        renderBlogFilters(onClearAllTagFilterfn, onClearTagFilterfn);

        const listOfFilterPill = screen.getByTestId('blog-filters-list-of-pill').querySelectorAll('.ui-pill');
        expect(listOfFilterPill.length).toEqual(2);

        const clearAllDOM = screen.getByText(/BLOGS_FILTERS_CLEAR_ALL/i);
        expect(clearAllDOM.className).toMatch(/blog-filters-clear/);

        if (clearAllDOM) {
            act(() => {
                clearAllDOM.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });
            expect(onClearAllTagFilterfn).toHaveBeenCalled();
        }
    });

    test('test if the BlogFilters render is ok when one of the filter clear icon is clicked', () => {
        const onClearAllTagFilterfn = jest.fn();
        const onClearTagFilterfn = jest.fn();

        renderBlogFilters(onClearAllTagFilterfn, onClearTagFilterfn);

        let listOfFilterPill = screen
            .getByTestId('blog-filters-list-of-pill')
            .querySelectorAll('.ui-pill-icon-container');
        expect(listOfFilterPill.length).toEqual(2);

        if (listOfFilterPill) {
            act(() => {
                listOfFilterPill[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });
            expect(onClearTagFilterfn).toHaveBeenCalled();
        }
    });
});
