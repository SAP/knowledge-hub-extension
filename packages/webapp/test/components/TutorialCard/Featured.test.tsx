import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';

import { initIcons } from '@sap-ux/ui-components';
import { initLCIcons } from '../../../src/webview/Icons/icons';

import { render } from '../../__mocks__/store.mock';

import { Featured } from '../../../src/webview/components/TutorialCard/Featured';

describe('TutorialCard > Featured', () => {
    // Initialize and register ui-components icons and specific icon to LC
    initIcons();
    initLCIcons();

    const renderFeatured = (): RenderResult => render(<Featured />);

    test('test if the Featured text is rendered', () => {
        renderFeatured();

        const featuredDOM = screen.getByText(/Featured/i);

        expect(featuredDOM.className).toEqual('featured-text');
    });
});
