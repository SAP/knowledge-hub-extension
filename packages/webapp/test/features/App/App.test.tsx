import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';

import { initIcons } from '@sap-ux/ui-components';

import { appInitialState } from '../../../test/__mocks__/app';

import { render } from '../../../test/__mocks__/store.mock';

import { App } from '../../../src/webview/features/app/App';

describe('App', () => {
    // Initialize and register ui-components icons and specific icon to LC
    initIcons();

    test('render an App component', () => {
        const renderApp = (): RenderResult => render(<App />, { initialState: { app: appInitialState } });

        renderApp();

        screen.debug();

        const loadingText = screen.getByText('APP_LOADING_CONTENT');
        expect(loadingText.className).toContain('ms-Spinner-label');
    });
});
