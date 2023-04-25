import React from 'react';

import { screen, fireEvent } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { initIcons } from '@sap-ux/ui-components';

import { render } from '../../../test/__mocks__/store.mock';

import { Search } from '../../../src/webview/features/search/Search';
import { act } from 'react-dom/test-utils';

describe('Search', () => {
    // Initialize and register ui-components icons and specific icon to LC
    initIcons();

    const renderSearch = (type: string): RenderResult => render(<Search type={type} />);

    test('render a Search component with a type different from `Home`', () => {
        renderSearch('tutorials');
        const element = screen.getByTestId('search-component').querySelector('.search-box');
        expect(element).toBeTruthy();
    });

    test('render a Search component with a type equal `Home`', () => {
        renderSearch('home');
        expect(() => screen.getByTestId('search-component')).toThrow();
    });

    test('render a Search component', async () => {
        const user = userEvent.setup();

        renderSearch('tutorials');

        const searchInput = screen.getByRole('searchbox');
        if (searchInput) {
            searchInput.focus();
            await user.type(searchInput, 'my test{enter}');

            act(() => {
                fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter', charCode: 13 });
            });
        }

        const clearBtn = screen.getByLabelText('Clear text');
        if (clearBtn) {
            await user.click(clearBtn);
        }

        screen.debug();
    });
});
