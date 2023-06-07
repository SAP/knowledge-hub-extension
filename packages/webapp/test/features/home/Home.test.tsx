import React from 'react';
import '@testing-library/jest-dom';

import { screen } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';

import { initIcons } from '@sap-ux/ui-components';

import { blogsWithDataNoError, blogsInitialWithLoading, blogsNoErrorWithLoading } from '../../../test/__mocks__/blogs';
import {
    tutorialsInitialWithLoading,
    tutorialsWithDataNoError,
    tutorialsWithNoDataWithPending
} from '../../../test/__mocks__/tutorials';
import { renderWithRouter } from '../../../test/__mocks__/store.mock';

import { Home } from '../../../src/webview/features/home/Home';

describe('Home', () => {
    // Initialize and register ui-components icons and specific icon to LC
    initIcons();

    test('render a Home component initial, do the fetch call', () => {
        const renderHomeInitial = (): RenderResult =>
            renderWithRouter(<Home />, {
                initialState: {
                    home: { blogs: blogsInitialWithLoading.result, tutorials: tutorialsInitialWithLoading.result }
                }
            });

        renderHomeInitial();

        const headerText = screen.getByText('HOME_TITLE');
        expect(headerText.className).toMatch(/home-header-title/i);
    });

    test('render a Home component with data', () => {
        const renderHome = (): RenderResult =>
            renderWithRouter(<Home />, {
                initialState: {
                    home: { blogs: blogsWithDataNoError.result, tutorials: tutorialsWithDataNoError.result }
                }
            });

        renderHome();

        const headerText = screen.getByText('HOME_TITLE');
        expect(headerText.className).toMatch(/home-header-title/i);
    });

    test('render a Home component with loading', () => {
        const renderHomeWithLoading = (): RenderResult =>
            renderWithRouter(<Home />, {
                initialState: {
                    home: { blogs: blogsNoErrorWithLoading.result, tutorials: tutorialsWithNoDataWithPending.result }
                }
            });

        renderHomeWithLoading();

        const headerText = screen.getByText('HOME_TITLE');
        expect(headerText.className).toMatch(/home-header-title/i);

        const blogsLoadingDOM = screen.getByText(/BLOGS_LOADING_CONTENT/i);
        expect(blogsLoadingDOM.className).toMatch(/ms-Spinner-label/i);

        const tutorialsLoadingDOM = screen.getByText(/TUTORIALS_LOADING_CONTENT/i);
        expect(tutorialsLoadingDOM.className).toMatch(/ms-Spinner-label/i);
    });
});
