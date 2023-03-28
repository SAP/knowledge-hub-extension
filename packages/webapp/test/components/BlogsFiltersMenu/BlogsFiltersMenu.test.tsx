import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { initIcons } from '@sap-ux/ui-components';
import { initLCIcons } from '../../../src/webview/Icons/icons';

import { withDataNoError } from '../../__mocks__/blogs';
import { render } from '../../__mocks__/store.mock';

import { BlogsFiltersMenu } from '../../../src/webview/components/BlogsFiltersMenu';

describe('BlogsFiltersMenu', () => {
    // Initialize and register ui-components icons and specific icon to LC
    initIcons();
    initLCIcons();

    const renderBlogsFiltersMenu = (loading: boolean): RenderResult =>
        render(<BlogsFiltersMenu loading={loading} />, {
            initialState: { tutorials: withDataNoError }
        });

    test('test if the BlogsFiltersMenu render is ok with data', () => {
        const loading = false;
        renderBlogsFiltersMenu(loading);

        const filteredMenuTitleDOM = screen.getByTestId('blogs-filters-menu__content');
        expect(filteredMenuTitleDOM.className).toEqual('blogs-filters-menu__content');
    });
});
