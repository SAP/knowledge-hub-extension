import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';

import { initIcons } from '@sap-ux/ui-components';
import { initLCIcons } from '../../../src/webview/Icons/icons';

import { render } from '../../__mocks__/store.mock';

import { WithError } from '../../../src/webview/components/WithError';

describe('WithError', () => {
    // Initialize and register ui-components icons and specific icon to LC
    initIcons();
    initLCIcons();

    const renderWithError = (): RenderResult => render(<WithError />);

    test('test if the WithError text is rendered', () => {
        renderWithError();

        const withErrorTitleDOM = screen.getByText(/WITH_ERROR_TITLE/i);
        expect(withErrorTitleDOM.className).toEqual('with-error-title ui-large-header');

        const withErrorDescriptionDOM = screen.getByText(/WITH_ERROR_DESCRIPTION/i);
        expect(withErrorDescriptionDOM.className).toEqual('with-error-sub-title ui-medium-text');
    });
});
