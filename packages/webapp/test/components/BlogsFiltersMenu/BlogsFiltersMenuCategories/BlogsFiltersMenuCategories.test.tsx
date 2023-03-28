import React from 'react';
import '@testing-library/jest-dom';
import { act, fireEvent, screen } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';

import { initIcons } from '@sap-ux/ui-components';
import { initLCIcons } from '../../../../src/webview/Icons/icons';

import { withNoDataWithError } from '../../../__mocks__/blogs';
import { render } from '../../../__mocks__/store.mock';

import { BlogsFiltersMenuCategories } from '../../../../src/webview/components/BlogsFiltersMenu/BlogsFiltersMenuCategories';
import * as utils from '../../../../src/webview/features/blogs/Blogs.utils';

describe('BlogsFiltersMenuCategories', () => {
    // Initialize and register ui-components icons and specific icon to LC
    initIcons();
    initLCIcons();

    const renderBlogsFiltersMenuCategories = (loading: boolean, isSmall: boolean): RenderResult =>
        render(<BlogsFiltersMenuCategories loading={loading} isSmall={isSmall} />, {
            initialState: { blogs: withNoDataWithError }
        });

    test('test if the BlogsFiltersMenuCategories render is ok with data - small size', () => {
        const loading = false;
        const isSmall = true;
        renderBlogsFiltersMenuCategories(loading, isSmall);

        const filteredMenuCategoriesTitleDOM = screen.getByTestId('blogs-filters-menu-categories');
        expect(filteredMenuCategoriesTitleDOM.className).toEqual(
            'blogs-filters-menu-categories blogs-filters-menu-categories__small'
        );
    });

    test('test if the BlogsFiltersMenuCategories render is ok with data - normal size', () => {
        const loading = false;
        const isSmall = false;
        renderBlogsFiltersMenuCategories(loading, isSmall);

        const filteredMenuCategoriesTitleDOM = screen.getByTestId('blogs-filters-menu-categories');
        expect(filteredMenuCategoriesTitleDOM.className).toEqual(
            'blogs-filters-menu-categories blogs-filters-menu-categories__normal'
        );
    });

    test('test if the BlogsFiltersMenuCategories render is ok with data', async () => {
        const loading = false;
        const isSmall = false;
        const spyOnCategorySelected = jest.spyOn(utils, 'onCategorySelected');

        renderBlogsFiltersMenuCategories(loading, isSmall);

        const filteredMenuCategoriesTitleDOM = screen.getByText('BLOGS_FILTERS_CATEGORIES');
        expect(filteredMenuCategoriesTitleDOM.className).toMatch(/blogs-filters-menu-categories__header-title/i);

        let listOfCategories = screen
            .getByTestId('blogs-filters-menu-categories__content-list')
            .querySelectorAll('.blogs-filters-menu-categories__content-list-categories');
        expect(listOfCategories.length).toEqual(6);

        if (listOfCategories) {
            const checkbox = screen.getAllByRole('checkbox')?.[0];

            if (checkbox) {
                // Confirm checkbox is not selected
                expect(checkbox).not.toBeChecked();

                // Simulate click
                fireEvent.click(screen.getAllByRole('checkbox')?.[0]);

                expect(spyOnCategorySelected).toHaveBeenCalledWith('b6e6296c-7cf2-4fe6-aa91-d77078aad028', true);
            }
        }
    });
});
