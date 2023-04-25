import React from 'react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';

import { initIcons } from '@sap-ux/ui-components';

import {
    initialWithLoading,
    withNoDataNoError,
    withNoDataWithError,
    withDataNoError,
    withDataWithFilter,
    withDataNoErrorMultiplePage,
    withDataWithTags
} from '../../../test/__mocks__/blogs';
import { renderWithRouter } from '../../../test/__mocks__/store.mock';

import { Blogs } from '../../../src/webview/features/blogs/Blogs';

describe('Blogs', () => {
    // Initialize and register ui-components icons and specific icon to LC
    initIcons();

    test('render a Blogs component initial, do the fetch call', () => {
        const renderBlogsInitial = (): RenderResult =>
            renderWithRouter(<Blogs />, { initialState: { blogs: initialWithLoading } });

        act(() => {
            renderBlogsInitial();
        });

        const headerText = screen.getByText('BLOGS_TITLE');
        expect(headerText.className).toEqual('blogs-header-title');

        const loadingTitleDOM = screen.getByText(/BLOGS_LOADING_CONTENT/i);
        expect(loadingTitleDOM.className).toContain('ms-Spinner-label');
    });

    test('render a Blogs component with data', () => {
        const renderBlogs = (): RenderResult =>
            renderWithRouter(<Blogs />, { initialState: { blogs: withDataNoError } });

        renderBlogs();

        const headerText = screen.getByText('BLOGS_TITLE');
        expect(headerText.className).toEqual('blogs-header-title');
    });

    test('render a Blogs component with no data', () => {
        const renderBlogsNoData = (): RenderResult =>
            renderWithRouter(<Blogs />, { initialState: { blogs: withNoDataNoError } });

        renderBlogsNoData();

        const headerText = screen.getByText('BLOGS_TITLE');
        expect(headerText.className).toEqual('blogs-header-title');

        const noResultTitleDOM = screen.getByText(/NO_RESULT_TITLE/i);
        expect(noResultTitleDOM.className).toEqual('no-result-title ui-large-header');
    });

    test('render a Blogs component with error', () => {
        const renderBlogsNoData = (): RenderResult =>
            renderWithRouter(<Blogs />, { initialState: { blogs: withNoDataWithError } });

        renderBlogsNoData();

        const headerText = screen.getByText('BLOGS_TITLE');
        expect(headerText.className).toEqual('blogs-header-title');

        const withErrorTitleDOM = screen.getByText(/WITH_ERROR_TITLE/i);
        expect(withErrorTitleDOM.className).toEqual('with-error-title ui-large-header');
    });

    test('render a Blogs component with filters', () => {
        const renderBlogsWithFilters = (): RenderResult =>
            renderWithRouter(<Blogs />, { initialState: { blogs: withDataWithFilter } });

        renderBlogsWithFilters();

        const headerText = screen.getByText('BLOGS_TITLE');
        expect(headerText.className).toEqual('blogs-header-title');

        const filteredHeaderDOM = screen.getByText(/BLOGS_FILTERS_BAR_FILTERED_BY/i);
        expect(filteredHeaderDOM.className).toEqual('blogs-filters-bar-header-title');

        const listOfFilterPill = screen.getByTestId('blogs-filters-bar-list-of-pill').querySelectorAll('.ui-pill');
        expect(listOfFilterPill.length).toEqual(4);

        const clearAllDOM = screen.getByText(/BLOGS_FILTERS_BAR_CLEAR_ALL/i);
        expect(clearAllDOM.className).toContain('ms-Button-label');
    });

    test('render a Blogs component, pagination event handler', () => {
        const renderBlogsWithFilters = (): RenderResult =>
            renderWithRouter(<Blogs />, { initialState: { blogs: withDataNoErrorMultiplePage } });

        act(() => {
            renderBlogsWithFilters();
        });

        const headerText = screen.getByText('BLOGS_TITLE');
        expect(headerText.className).toEqual('blogs-header-title');

        const paginationNextText = screen.getByText('UI_PAGINATION_CAPTION_NEXT');
        expect(paginationNextText.className).toEqual('ui-pagination-page__li__anchor');

        const paginationPreviousText = screen.getByText('UI_PAGINATION_CAPTION_PREVIOUS');
        expect(paginationPreviousText.className).toEqual(
            'ui-pagination-page__li__anchor ui-pagination-page__disabled__anchor'
        );

        const paginationFirstPageText = screen.getByText('1');
        expect(paginationFirstPageText.className).toEqual(
            'ui-pagination-page__li__anchor ui-pagination-page__active__anchor'
        );

        const paginationSecondPageText = screen.getByText('2');
        expect(paginationSecondPageText.className).toEqual('ui-pagination-page__li__anchor');

        if (paginationNextText) {
            act(() => {
                paginationNextText.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });

            expect(paginationFirstPageText.className).toEqual('ui-pagination-page__li__anchor');
            expect(paginationSecondPageText.className).toEqual(
                'ui-pagination-page__li__anchor ui-pagination-page__active__anchor'
            );
        }
    });

    test('render a Blogs component, select tag event handler', () => {
        const renderBlogs = (): RenderResult =>
            renderWithRouter(<Blogs />, { initialState: { blogs: withDataWithTags } });

        renderBlogs();

        const headerText = screen.getByText('BLOGS_TITLE');
        expect(headerText.className).toEqual('blogs-header-title');

        const tagsText = screen.getByTestId('ui-pill-tag-1');

        if (tagsText) {
            act(() => {
                tagsText.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });

            const filteredHeaderDOM = screen.getByText(/BLOGS_FILTERS_BAR_FILTERED_BY/i);
            expect(filteredHeaderDOM.className).toEqual('blogs-filters-bar-header-title');

            const listOfFilterPill = screen.getByTestId('blogs-filters-bar-list-of-pill').querySelectorAll('.ui-pill');
            expect(listOfFilterPill.length).toEqual(3);

            const clearAllDOM = screen.getByText(/BLOGS_FILTERS_BAR_CLEAR_ALL/i);
            expect(clearAllDOM.className).toContain('ms-Button-label');
        }
    });
});
