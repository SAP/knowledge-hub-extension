import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';

import { initIcons } from '@sap-ux/ui-components';

import { blogsWithDataNoErrorMenuOpened } from '../../__mocks__/blogs';
import { renderWithRouter } from '../../__mocks__/store.mock';

import { BlogsFiltersMenu } from '../../../src/webview/components/BlogsFiltersMenu';

describe('BlogsFiltersMenu', () => {
    // Initialize and register ui-components icons and specific icon to LC
    initIcons();

    const renderBlogsFiltersMenu = (loading: boolean): RenderResult =>
        renderWithRouter(<BlogsFiltersMenu loading={loading} />, {
            initialState: { blogs: blogsWithDataNoErrorMenuOpened }
        });

    test('test if the BlogsFiltersMenu render is ok with data', () => {
        const loading = false;
        renderBlogsFiltersMenu(loading);

        const filteredMenuTitleDOM = screen.getByTestId('blogs-filters-menu__content');
        expect(filteredMenuTitleDOM.className).toEqual('blogs-filters-menu__content');
    });
});
