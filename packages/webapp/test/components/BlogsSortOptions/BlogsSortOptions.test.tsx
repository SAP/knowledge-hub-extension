import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { initIcons } from '@sap-ux/ui-components';

import { queryWithSearchTerm } from '../../__mocks__/blogs';
import { render } from '../../__mocks__/store.mock';

import { BlogsSortOptions } from '../../../src/webview/components/BlogsSortOptions/BlogsSortOptions';

describe('BlogsSortOptions', () => {
    // Initialize and register ui-components icons and specific icon to LC
    initIcons();

    const renderBlogsSortOptions = (): RenderResult =>
        render(<BlogsSortOptions />, {
            initialState: {
                blogs: { query: queryWithSearchTerm }
            }
        });

    test('test if the BlogsSortOptions render is ok', () => {
        renderBlogsSortOptions();

        const blogsSortOptionsTitle = screen.getByText(/BLOGS_SORT_BY_DESCRIPTION/i);
        expect(blogsSortOptionsTitle.className).toEqual('blogs-sort-options__title');

        const blogsSortOptionsByRelevance = screen.getByText(/BLOGS_SORT_BY_RELEVANCE/i);
        expect(blogsSortOptionsByRelevance.className).toContain(
            'blogs-sort-options__options-entry blogs-sort-options__options-entry__active'
        );

        const blogsSortOptionsByLastUpdated = screen.getByText(/BLOGS_SORT_BY_LAST_UPDATED/i);
        expect(blogsSortOptionsByLastUpdated.className).toContain(
            'blogs-sort-options__options-entry blogs-sort-options__options-entry__not-active'
        );
    });

    test('test if the BlogsSortOptions render is ok when a sort option is selected', () => {
        renderBlogsSortOptions();

        const blogsSortOptionsByLastUpdated = screen.getByText(/BLOGS_SORT_BY_LAST_UPDATED/i);
        expect(blogsSortOptionsByLastUpdated.className).toContain(
            'blogs-sort-options__options-entry blogs-sort-options__options-entry__not-active'
        );

        if (blogsSortOptionsByLastUpdated) {
            act(() => {
                blogsSortOptionsByLastUpdated.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });

            const blogsSortOptionsByLastUpdatedAfter = screen.getByText(/BLOGS_SORT_BY_LAST_UPDATED/i);
            expect(blogsSortOptionsByLastUpdatedAfter.className).toContain(
                'blogs-sort-options__options-entry blogs-sort-options__options-entry__active'
            );

            const blogsSortOptionsByRelevance = screen.getByText(/BLOGS_SORT_BY_RELEVANCE/i);
            expect(blogsSortOptionsByRelevance.className).toContain(
                'blogs-sort-options__options-entry blogs-sort-options__options-entry__not-active'
            );

            if (blogsSortOptionsByRelevance) {
                act(() => {
                    blogsSortOptionsByRelevance.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                });

                const blogsSortOptionsByRelevanceAfter = screen.getByText(/BLOGS_SORT_BY_RELEVANCE/i);
                expect(blogsSortOptionsByRelevanceAfter.className).toContain(
                    'blogs-sort-options__options-entry blogs-sort-options__options-entry__active'
                );

                const blogsSortOptionsByLastUpdatedAfter2 = screen.getByText(/BLOGS_SORT_BY_LAST_UPDATED/i);
                expect(blogsSortOptionsByLastUpdatedAfter2.className).toContain(
                    'blogs-sort-options__options-entry blogs-sort-options__options-entry__not-active'
                );
            }
        }
    });
});
