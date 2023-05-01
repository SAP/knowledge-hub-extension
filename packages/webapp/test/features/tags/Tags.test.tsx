import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import type { RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { initIcons } from '@sap-ux/ui-components';

import { tagsWithTags } from '../../../test/__mocks__/tags';

import { renderWithRouter } from '../../../test/__mocks__/store.mock';

import { Tags } from '../../../src/webview/features/tags/Tags';

describe('Tag', () => {
    // Initialize and register ui-components icons and specific icon to LC
    initIcons();

    test('render an Tag component', () => {
        let scrollIntoViewMock = jest.fn();
        window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

        const renderTags = (): RenderResult => renderWithRouter(<Tags />, { initialState: { tags: tagsWithTags } });

        renderTags();

        const headerText = screen.getByText('TAGS_TITLE');
        expect(headerText.className).toMatch(/ui-large-header tags-header-title/i);
    });

    test('it should scroll to view when letter bar element is selected', () => {
        let scrollIntoViewMock = jest.fn();
        window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

        const renderTags = (): RenderResult => renderWithRouter(<Tags />, { initialState: { tags: tagsWithTags } });

        renderTags();

        const headerText = screen.getByText('TAGS_TITLE');
        expect(headerText.className).toMatch(/ui-large-header tags-header-title/i);

        const tagBarTV = screen.getByTestId('T–V');
        if (tagBarTV) {
            act(() => {
                tagBarTV.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });
        }
        expect(scrollIntoViewMock).toHaveBeenCalled();
    });

    test('it should scroll to top when go to top btn is selected', () => {
        let scrollIntoViewMock = jest.fn();
        window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

        const renderTags = (): RenderResult => renderWithRouter(<Tags />, { initialState: { tags: tagsWithTags } });

        renderTags();

        const headerText = screen.getByText('TAGS_TITLE');
        expect(headerText.className).toMatch(/ui-large-header tags-header-title/i);

        const tagBarTV = screen.getByTestId('T-btn-top');
        if (tagBarTV) {
            act(() => {
                tagBarTV.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });
        }
        expect(scrollIntoViewMock).toHaveBeenCalled();
    });

    test('it should filter the list of tags when search', async () => {
        const user = userEvent.setup();

        const renderTags = (): RenderResult => renderWithRouter(<Tags />, { initialState: { tags: tagsWithTags } });

        renderTags();

        let listOfTags = screen.getByTestId('T-wrapper').querySelectorAll('.tags-content-wrapper__item-list-item');
        expect(listOfTags.length).toEqual(5);

        const searchInput = screen.getByRole('searchbox');
        if (searchInput) {
            act(() => {
                searchInput.focus();
            });
            await user.type(searchInput, 't');
            await user.type(searchInput, 'a');
            await user.type(searchInput, 'g');
            await user.type(searchInput, ' ');
            await user.type(searchInput, '1');

            let listOfTags = screen.getByTestId('T-wrapper').querySelectorAll('.tags-content-wrapper__item-list-item');
            expect(listOfTags.length).toEqual(1);

            const clearBtn = screen.getByLabelText('Clear text');
            if (clearBtn) {
                await user.click(clearBtn);
            }

            let listOfTagsAfter = screen
                .getByTestId('T-wrapper')
                .querySelectorAll('.tags-content-wrapper__item-list-item');
            expect(listOfTagsAfter.length).toEqual(5);
        }
    });
});
