import React from 'react';
import '@testing-library/jest-dom';
import { act, fireEvent, screen } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { initIcons } from '@sap-ux/ui-components';

import { blogsWithDataWithTags } from '../../../__mocks__/blogs';
import { blogsTagsWithTags } from '../../../__mocks__/tags';
import { renderWithRouter } from '../../../__mocks__/store.mock';

import { BlogsFiltersMenuTags } from '../../../../src/webview/components/BlogsFiltersMenu/BlogsFiltersMenuTags';
import * as utils from '../../../../src/webview/features/blogs/Blogs.utils';

describe('BlogsFiltersMenuTags', () => {
    // Initialize and register ui-components icons and specific icon to LC
    initIcons();

    const renderBlogsFiltersMenuTags = (withSearchOn: boolean, loading: boolean, isSmall: boolean): RenderResult =>
        renderWithRouter(<BlogsFiltersMenuTags withSearchOn={withSearchOn} loading={loading} isSmall={isSmall} />, {
            initialState: { blogs: blogsWithDataWithTags, tags: blogsTagsWithTags }
        });

    test('test if the BlogsFiltersMenuTags render is ok with data - small size', () => {
        const withSearchOn = true;
        const loading = false;
        const isSmall = true;

        renderBlogsFiltersMenuTags(withSearchOn, loading, isSmall);

        const filteredMenuTagsTitleDOM = screen.getByTestId('blogs-filters-menu-tags');
        expect(filteredMenuTagsTitleDOM.className).toEqual('blogs-filters-menu-tags blogs-filters-menu-tags__small');
    });

    test('test if the BlogsFiltersMenuTags render is ok with data - normal size', () => {
        const withSearchOn = true;
        const loading = false;
        const isSmall = false;
        renderBlogsFiltersMenuTags(withSearchOn, loading, isSmall);

        const filteredMenuTagsTitleDOM = screen.getByTestId('blogs-filters-menu-tags');
        expect(filteredMenuTagsTitleDOM.className).toEqual('blogs-filters-menu-tags blogs-filters-menu-tags__normal');
    });

    test('test if the BlogsFiltersMenuTags render is ok with data', async () => {
        const withSearchOn = true;
        const loading = false;
        const isSmall = false;
        const spyOnTagsSelected = jest.spyOn(utils, 'onTagSelected');

        renderBlogsFiltersMenuTags(withSearchOn, loading, isSmall);

        const filteredMenuTagsTitleDOM = screen.getByText('BLOGS_FILTERS_TAGS');
        expect(filteredMenuTagsTitleDOM.className).toMatch(/blogs-filters-menu-tags__header-title/i);

        let listOfTags = screen
            .getByTestId('blogs-filters-menu-tags__content-list')
            .querySelectorAll('.blogs-filters-menu-tags__content-list-tags');
        expect(listOfTags.length).toEqual(5);

        if (listOfTags) {
            const checkbox = screen.getAllByRole('checkbox')?.[0];

            if (checkbox) {
                // Confirm checkbox is not selected
                expect(checkbox).not.toBeChecked();

                // Simulate click
                fireEvent.click(screen.getAllByRole('checkbox')?.[0]);

                expect(spyOnTagsSelected).toHaveBeenCalledWith({ displayName: 'tag 1', guid: '1' }, true);
            }
        }
    });

    test('test if the search tag render ok and respond to search', async () => {
        const user = userEvent.setup();
        const withSearchOn = true;
        const loading = false;
        const isSmall = false;

        renderBlogsFiltersMenuTags(withSearchOn, loading, isSmall);

        const searchInput = screen.getByRole('searchbox');
        if (searchInput) {
            act(() => {
                searchInput.focus();
            });
            await user.type(searchInput, 't');
            await user.type(searchInput, 'a');
            await user.type(searchInput, 'g');
            await user.type(searchInput, ' ');
            await user.type(searchInput, '1');

            let listOfTags = screen
                .getByTestId('blogs-filters-menu-tags__content-list')
                .querySelectorAll('.blogs-filters-menu-tags__content-list-tags');
            expect(listOfTags.length).toEqual(1);

            const clearBtn = screen.getByLabelText('Clear text');
            if (clearBtn) {
                await user.click(clearBtn);
            }

            let listOfTagsAfter = screen
                .getByTestId('blogs-filters-menu-tags__content-list')
                .querySelectorAll('.blogs-filters-menu-tags__content-list-tags');
            expect(listOfTagsAfter.length).toEqual(5);
        }
    });
});
