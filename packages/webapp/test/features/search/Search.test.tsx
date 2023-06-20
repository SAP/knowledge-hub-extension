import React from 'react';

import { screen, fireEvent } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';

import { initIcons } from '@sap-ux/ui-components';
import { Search } from '../../../src/webview/features/search/Search';

import * as blogsUtils from '../../../src/webview/features/blogs/Blogs.utils';
import * as tutorialsUtils from '../../../src/webview/features/tutorials/Tutorials.utils';

import { render } from '../../../test/__mocks__/store.mock';

describe('Search', () => {
    // Initialize and register ui-components icons and specific icon to LC
    initIcons();

    const renderSearch = (type: string): RenderResult => render(<Search type={type} />);

    test('render a Search component with a type different from `Home`', () => {
        renderSearch('tutorials');
        const element = screen.getByTestId('search-component').querySelector('.search-box');
        expect(element).toBeTruthy();
    });

    test('render a Search component with search - enter - home tab', async () => {
        const spyOnSearchTutorials = jest.spyOn(tutorialsUtils, 'searchTutorials');
        const spyOnSearchBlogs = jest.spyOn(blogsUtils, 'searchBlogs');

        renderSearch('home');

        const searchInput = screen.getByRole('searchbox');
        if (searchInput) {
            searchInput.focus();

            fireEvent.input(searchInput, { target: { value: 'Fiori Tools' } });
            fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter', keyCode: 13 });

            expect(spyOnSearchTutorials).toHaveBeenCalledWith('Fiori Tools');
            expect(spyOnSearchBlogs).toHaveBeenCalledWith('Fiori Tools');
        }
    });

    test('render a Search component with search - blur - home tab', async () => {
        const spyOnSearchTutorials = jest.spyOn(tutorialsUtils, 'searchTutorials');
        const spyOnSearchBlogs = jest.spyOn(blogsUtils, 'searchBlogs');

        renderSearch('home');

        const searchInput = screen.getByRole('searchbox');
        if (searchInput) {
            searchInput.focus();

            fireEvent.input(searchInput, { target: { value: 'Fiori Tools' } });
            fireEvent.blur(searchInput);

            expect(spyOnSearchTutorials).toHaveBeenCalledWith('Fiori Tools');
            expect(spyOnSearchBlogs).toHaveBeenCalledWith('Fiori Tools');
        }
    });
});
