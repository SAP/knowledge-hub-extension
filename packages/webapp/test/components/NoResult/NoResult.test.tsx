import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';

import { initIcons } from '@sap-ux/ui-components';
import { initLCIcons } from '../../../src/webview/Icons/icons';

import { render } from '../../__mocks__/store.mock';

import { NoResult } from '../../../src/webview/components/NoResult';

describe('NoResult', () => {
    // Initialize and register ui-components icons and specific icon to LC
    initIcons();
    initLCIcons();

    const renderNoResult = (): RenderResult => render(<NoResult />);

    test('test if the NoResult text is rendered', () => {
        renderNoResult();

        const noResultTitleDOM = screen.getByText(/NO_RESULT_TITLE/i);
        expect(noResultTitleDOM.className).toEqual('no-result-title ui-large-header');

        const noResultDescriptionDOM = screen.getByText(/NO_RESULT_DESCRIPTION/i);
        expect(noResultDescriptionDOM.className).toEqual('no-result-sub-title ui-medium-text');
    });
});
