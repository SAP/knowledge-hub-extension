import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import type { RenderResult } from '@testing-library/react';

import { initIcons } from '@sap-ux/ui-components';

import { tagsWithTags } from '../../../test/__mocks__/tags';

import { renderWithRouter } from '../../../test/__mocks__/store.mock';

import { Tags } from '../../../src/webview/features/tags/Tags';

describe('App', () => {
    // Initialize and register ui-components icons and specific icon to LC
    initIcons();

    test('render an App component', () => {
        const renderTags = (): RenderResult => renderWithRouter(<Tags />, { initialState: { tags: tagsWithTags } });

        renderTags();

        screen.debug();

        const headerText = screen.getByText('TAGS_TITLE');
        expect(headerText.className).toMatch(/ui-large-header tags-header-title/i);
    });
});
