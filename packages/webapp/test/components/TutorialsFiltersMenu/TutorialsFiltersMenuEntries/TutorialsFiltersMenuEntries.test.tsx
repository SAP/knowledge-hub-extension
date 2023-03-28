import React from 'react';
import '@testing-library/jest-dom';
import { screen, fireEvent } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

import { initIcons } from '@sap-ux/ui-components';
import { initLCIcons } from '../../../../src/webview/Icons/icons';

import type { TutorialsTags, TutorialsFacets } from '@sap/knowledge-hub-extension-types';

import { withDataNoErrorWithFilters } from '../../../__mocks__/tutorials';
import { render } from '../../../__mocks__/store.mock';

import { TutorialsFiltersMenuEntries } from '../../../../src/webview/components/TutorialsFiltersMenu/TutorialsFiltersMenuEntries';

describe('TutorialsFiltersMenuEntries', () => {
    // Initialize and register ui-components icons and specific icon to LC
    initIcons();
    initLCIcons();

    const tags = {
        'Tag 1': {
            title: 'Tag 1',
            tagTitle: 'Tag 1 description',
            tagAlternativeTitles: []
        },
        'Tag 2': {
            title: 'Tag 2',
            tagTitle: 'Tag 2 description',
            tagAlternativeTitles: []
        },
        'Tag 3': {
            title: 'Tag 3',
            tagTitle: 'Tag 3 description',
            tagAlternativeTitles: []
        },
        'Tag 4': {
            title: 'Tag 4',
            tagTitle: 'Tag 4 description',
            tagAlternativeTitles: []
        },
        'Tag 5': {
            title: 'Tag 5',
            tagTitle: 'Tag 5 description',
            tagAlternativeTitles: []
        },
        'Tag 6': {
            title: 'Tag 6',
            tagTitle: 'Tag 6 description',
            tagAlternativeTitles: []
        },
        'Tag 7': {
            title: 'Tag 7',
            tagTitle: 'Tag 7 description',
            tagAlternativeTitles: []
        },
        'Tag 8': {
            title: 'Tag 8',
            tagTitle: 'Tag 8 description',
            tagAlternativeTitles: []
        },
        'Tag 9': {
            title: 'Tag 9',
            tagTitle: 'Tag 9 description',
            tagAlternativeTitles: []
        },
        'Tag 10': {
            title: 'Tag 10',
            tagTitle: 'Tag 10 description',
            tagAlternativeTitles: []
        },
        'Tag 11': {
            title: 'Tag 11',
            tagTitle: 'Tag 11 description',
            tagAlternativeTitles: []
        },
        'Tag 12': {
            title: 'Tag 12',
            tagTitle: 'Tag 12 description',
            tagAlternativeTitles: []
        },
        'Tag 13': {
            title: 'Tag 13',
            tagTitle: 'Tag 13 description',
            tagAlternativeTitles: []
        },
        'Tag 14': {
            title: 'Tag 14',
            tagTitle: 'Tag 14 description',
            tagAlternativeTitles: []
        }
    };

    const renderTutorialsFiltersMenuEntries = (
        title: string,
        entries: string[],
        tags: TutorialsTags,
        withSearchOn: boolean,
        isSmall: boolean,
        onSelectedTag: { (tag: string): void; (tag: string): void },
        onClearedTag: { (tag: string): void; (tag: string): void }
    ): RenderResult =>
        render(
            <TutorialsFiltersMenuEntries
                title={title}
                entries={entries}
                tags={tags}
                withSearchOn={withSearchOn}
                isSmall={isSmall}
                onSelectedTag={onSelectedTag}
                onClearedTag={onClearedTag}
            />,
            {
                initialState: { tutorials: withDataNoErrorWithFilters }
            }
        );

    test('test if the TutorialsFiltersMenuEntries render is ok with data', () => {
        const title = 'Topic';
        const entries = ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4'];
        const withSearchOn = true;
        const isSmall = false;
        const onSelectedTag = jest.fn();
        const onClearedTag = jest.fn();

        renderTutorialsFiltersMenuEntries(title, entries, tags, withSearchOn, isSmall, onSelectedTag, onClearedTag);

        const filteredMenuTitleDOM = screen.getByText(/Topic/i);
        expect(filteredMenuTitleDOM.className).toEqual('tutorials-filters-menu-entries__header-title');

        const searchInput = screen.getByRole('searchbox');
        expect(searchInput).toBeInTheDocument();
    });

    test('test if the TutorialsFiltersMenuEntries render is ok with data - no searchbox', () => {
        const title = 'Topic';
        const entries = ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4'];

        const withSearchOn = false;
        const isSmall = false;
        const onSelectedTag = jest.fn();
        const onClearedTag = jest.fn();

        renderTutorialsFiltersMenuEntries(title, entries, tags, withSearchOn, isSmall, onSelectedTag, onClearedTag);

        const filteredMenuTitleDOM = screen.getByText(/Topic/i);
        expect(filteredMenuTitleDOM.className).toEqual('tutorials-filters-menu-entries__header-title');

        expect(() => screen.getByRole('searchbox')).toThrow();
    });

    test('test if callback is call when searchBox change', async () => {
        const user = userEvent.setup();
        const title = 'Topic';
        const entries = ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4'];
        const withSearchOn = true;
        const isSmall = false;
        const onSelectedTag = jest.fn();
        const onClearedTag = jest.fn();

        renderTutorialsFiltersMenuEntries(title, entries, tags, withSearchOn, isSmall, onSelectedTag, onClearedTag);

        const searchInput = screen.getByRole('searchbox');
        expect(searchInput).toBeInTheDocument();

        const listOfTags = screen
            .getByTestId('tutorials-filters-menu-entries__content-list')
            .querySelectorAll('.tutorials-filters-menu-entries__content-list-entry');

        expect(listOfTags.length).toEqual(4);

        if (searchInput) {
            act(() => {
                searchInput.focus();
            });
            await user.type(searchInput, 'Tag 2{enter}');

            act(() => {
                fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter', charCode: 13 });
            });
        }

        const listOfTagsAfterSearch = screen
            .getByTestId('tutorials-filters-menu-entries__content-list')
            .querySelectorAll('.tutorials-filters-menu-entries__content-list-entry');

        expect(listOfTagsAfterSearch.length).toEqual(1);
    });

    test('test if callback is called when tag is selected', () => {
        const title = 'Topic';
        const entries = ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4'];
        const withSearchOn = true;
        const isSmall = false;
        const onSelectedTag = jest.fn();
        const onClearedTag = jest.fn();

        renderTutorialsFiltersMenuEntries(title, entries, tags, withSearchOn, isSmall, onSelectedTag, onClearedTag);

        const filteredMenuTitleDOM = screen.getByText(/Topic/i);
        expect(filteredMenuTitleDOM.className).toEqual('tutorials-filters-menu-entries__header-title');

        const listOfTags = screen
            .getByTestId('tutorials-filters-menu-entries__content-list')
            .querySelectorAll('.tutorials-filters-menu-entries__content-list-entry');

        const tag = listOfTags[0].querySelector('.ui-medium-text');
        if (tag) {
            act(() => {
                tag.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });
            expect(onSelectedTag).toHaveBeenCalled();
        }
    });
});
