import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import type { RenderResult } from '@testing-library/react';

import { initIcons } from '@sap-ux/ui-components';
import { initLCIcons } from '../../../src/webview/Icons/icons';

import { withDataNoErrorMultiplePage } from '../../../test/__mocks__/tutorials';

import { renderWithRouter } from '../../../test/__mocks__/store.mock';

import { UIPagination } from '../../../src/webview/components/UI/UIPagination';

describe('UIPagination', () => {
    // Initialize and register ui-components icons and specific icon to LC
    initIcons();
    initLCIcons();

    test('render a UIPagination component, pagination event handler', () => {
        const handlePageClick = jest.fn();
        const renderUIPagination = (): RenderResult =>
            renderWithRouter(
                <UIPagination
                    nextLabel="UI_PAGINATION_CAPTION_NEXT"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={20}
                    previousLabel="UI_PAGINATION_CAPTION_PREVIOUS"
                    forcePage={0}
                />,
                { initialState: { tutorials: withDataNoErrorMultiplePage } }
            );

        act(() => {
            renderUIPagination();
        });

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
    });
});
