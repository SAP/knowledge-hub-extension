import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, screen } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';

import { initIcons } from '@sap-ux/ui-components';

import { withDataWithFilter } from '../../../__mocks__/blogs';
import { render } from '../../../__mocks__/store.mock';

import { BlogsFiltersMenuLanguages } from '../../../../src/webview/components/BlogsFiltersMenu/BlogsFiltersMenuLanguages';
import * as utils from '../../../../src/webview/features/blogs/Blogs.utils';

describe('BlogsFiltersMenuLanguages', () => {
    // Initialize and register ui-components icons and specific icon to LC
    initIcons();

    const renderBlogsFiltersMenuLanguages = (loading: boolean, isSmall: boolean): RenderResult =>
        render(<BlogsFiltersMenuLanguages loading={loading} isSmall={isSmall} />, {
            initialState: { blogs: withDataWithFilter }
        });

    test('test if the BlogsFiltersMenuLanguages render is ok with data - small size', () => {
        const loading = false;
        const isSmall = true;
        renderBlogsFiltersMenuLanguages(loading, isSmall);

        const filteredMenuLanguagesTitleDOM = screen.getByTestId('blogs-filters-menu-languages');
        expect(filteredMenuLanguagesTitleDOM.className).toEqual(
            'blogs-filters-menu-languages blogs-filters-menu-languages__small'
        );
    });

    test('test if the BlogsFiltersMenuLanguages render is ok with data - normal size', () => {
        const loading = false;
        const isSmall = false;
        renderBlogsFiltersMenuLanguages(loading, isSmall);

        const filteredMenuLanguagesTitleDOM = screen.getByTestId('blogs-filters-menu-languages');
        expect(filteredMenuLanguagesTitleDOM.className).toEqual(
            'blogs-filters-menu-languages blogs-filters-menu-languages__normal'
        );
    });

    test('test if the BlogsFiltersMenuLanguages render is ok with data', async () => {
        const loading = false;
        const isSmall = false;
        const spyOnLanguageSelected = jest.spyOn(utils, 'onLanguageSelected');

        renderBlogsFiltersMenuLanguages(loading, isSmall);

        const filteredMenuLanguagesTitleDOM = screen.getByText('BLOGS_FILTERS_LANGUAGES');
        expect(filteredMenuLanguagesTitleDOM.className).toMatch(/blogs-filters-menu-languages__header-title/i);

        let listOfLanguages = screen
            .getByTestId('blogs-filters-menu-languages__content-list')
            .querySelectorAll('.ms-ChoiceField');
        expect(listOfLanguages.length).toEqual(6);

        if (listOfLanguages) {
            const radio = screen.getAllByRole('radio')?.[0];

            if (radio) {
                // Confirm radio is not selected
                expect(radio).not.toBeChecked();

                // Simulate click
                fireEvent.click(screen.getAllByRole('radio')?.[0]);

                expect(spyOnLanguageSelected).toHaveBeenCalledWith('en');
            }
        }
    });
});
