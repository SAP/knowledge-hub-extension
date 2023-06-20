import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import type { RenderResult } from '@testing-library/react';

import { initIcons } from '@sap-ux/ui-components';

import {
    tutorialsInitialWithLoading,
    tutorialsWithDataNoError,
    tutorialsWithNoDataNoError,
    tutorialsWithNoDataWithError,
    tutorialsWithDataNoErrorMultiplePage
} from '../../../test/__mocks__/tutorials';

import { renderWithRouter } from '../../../test/__mocks__/store.mock';

import { Tutorials } from '../../../src/webview/features/tutorials/Tutorials';

describe('Tutorials', () => {
    // Initialize and register ui-components icons and specific icon to LC
    initIcons();

    test('render a Tutorials component', () => {
        const renderTutorials = (): RenderResult =>
            renderWithRouter(<Tutorials />, { initialState: { tutorials: tutorialsInitialWithLoading } });

        renderTutorials();
        const headerText = screen.getByText('TUTORIALS_TITLE');
        expect(headerText.className).toEqual('ui-large-header tutorials-header-title');

        const noResultTitleDOM = screen.getByText(/TUTORIALS_LOADING_CONTENT/i);
        expect(noResultTitleDOM.className).toMatch(/ms-Spinner-label/i);
    });

    test('render a Tutorials component with data', () => {
        const renderTutorials = (): RenderResult =>
            renderWithRouter(<Tutorials />, { initialState: { tutorials: tutorialsWithDataNoError } });

        renderTutorials();

        const headerText = screen.getByText('TUTORIALS_TITLE');
        expect(headerText.className).toEqual('ui-large-header tutorials-header-title');
    });

    test('render a Tutorials component with no data', () => {
        const renderTutorialsNoData = (): RenderResult =>
            renderWithRouter(<Tutorials />, { initialState: { tutorials: tutorialsWithNoDataNoError } });

        renderTutorialsNoData();

        const headerText = screen.getByText('TUTORIALS_TITLE');
        expect(headerText.className).toEqual('ui-large-header tutorials-header-title');

        const noResultTitleDOM = screen.getByText(/NO_RESULT_TITLE/i);
        expect(noResultTitleDOM.className).toEqual('no-result-title ui-large-header');
    });

    test('render a Tutorials component with error', () => {
        const renderTutorialsNoData = (): RenderResult =>
            renderWithRouter(<Tutorials />, { initialState: { tutorials: tutorialsWithNoDataWithError } });

        renderTutorialsNoData();

        const headerText = screen.getByText('TUTORIALS_TITLE');
        expect(headerText.className).toEqual('ui-large-header tutorials-header-title');

        const withErrorTitleDOM = screen.getByText(/WITH_ERROR_TITLE/i);
        expect(withErrorTitleDOM.className).toEqual('with-error-title ui-large-header');
    });

    test('render a Tutorials component, pagination event handler', () => {
        const renderBlogsWithFilters = (): RenderResult =>
            renderWithRouter(<Tutorials />, { initialState: { tutorials: tutorialsWithDataNoErrorMultiplePage } });

        act(() => {
            renderBlogsWithFilters();
        });

        const headerText = screen.getByText('TUTORIALS_TITLE');
        expect(headerText.className).toEqual('ui-large-header tutorials-header-title');

        const paginationNextText = screen.getByText('UI_PAGINATION_CAPTION_NEXT');
        expect(paginationNextText.className).toEqual('ui-pagination-page__li__anchor');

        const paginationPreviousText = screen.getByText('UI_PAGINATION_CAPTION_PREVIOUS');
        expect(paginationPreviousText.className).toEqual(
            'ui-pagination-page__li__anchor ui-pagination-page__disabled__anchor'
        );

        const eltWithOneText = screen.getAllByText('1');
        let paginationFirstPageText: HTMLElement | undefined;
        eltWithOneText.forEach((element) => {
            if (element.className === 'ui-pagination-page__li__anchor ui-pagination-page__active__anchor') {
                paginationFirstPageText = element;
            }
        });

        if (paginationFirstPageText) {
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
        }
    });
});
