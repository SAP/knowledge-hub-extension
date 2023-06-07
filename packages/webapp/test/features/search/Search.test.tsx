import React from 'react';

import { screen } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';

import { initIcons } from '@sap-ux/ui-components';

import { render } from '../../../test/__mocks__/store.mock';

import { Search } from '../../../src/webview/features/search/Search';

describe('Search', () => {
    // Initialize and register ui-components icons and specific icon to LC
    initIcons();

    const renderSearch = (type: string): RenderResult => render(<Search type={type} />);

    test('render a Search component with a type different from `Home`', () => {
        renderSearch('tutorials');
        const element = screen.getByTestId('search-component').querySelector('.search-box');
        expect(element).toBeTruthy();
    });
});
