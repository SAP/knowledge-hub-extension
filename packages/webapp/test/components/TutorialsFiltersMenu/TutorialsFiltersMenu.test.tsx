import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { initIcons } from '@sap-ux/ui-components';

import type { TutorialsTags, TutorialsFacets } from '@sap/knowledge-hub-extension-types';

import { withDataNoErrorWithFilters } from '../../__mocks__/tutorials';
import { renderWithRouter } from '../../__mocks__/store.mock';

import { TutorialsFiltersMenu } from '../../../src/webview/components/TutorialsFiltersMenu';

describe('TutorialsFiltersMenu', () => {
    // Initialize and register ui-components icons and specific icon to LC
    initIcons();

    const renderTutorialsFiltersMenu = (facets: TutorialsFacets, tags: TutorialsTags, loading: boolean): RenderResult =>
        renderWithRouter(<TutorialsFiltersMenu facets={facets} tags={tags} loading={loading} />, {
            initialState: { tutorials: withDataNoErrorWithFilters }
        });

    test('test if the TutorialsFiltersMenu render is ok with data', () => {
        const facets = {
            Topic: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4'],
            Experience: ['Tag 5', 'Tag 6', 'Tag 7'],
            Type: ['Tag 8', 'Tag 9'],
            Software: ['Tag 10', 'Tag 11', 'Tag 12', 'Tag 13', 'Tag 14']
        };
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

        renderTutorialsFiltersMenu(facets, tags, false);

        const filteredMenuTitleDOM = screen.getByText('Topic');
        expect(filteredMenuTitleDOM.className).toEqual('tutorials-filters-menu-entries__header-title');
    });
});
