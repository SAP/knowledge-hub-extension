import React from 'react';
import '@testing-library/jest-dom';
import { act, fireEvent, getAllByRole, screen } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';

import type { TutorialsEntry } from '@sap/knowledge-hub-extension-types';

import { initIcons } from '@sap-ux/ui-components';

import { withDataNoError } from '../../__mocks__/tutorials';
import { render } from '../../__mocks__/store.mock';

import { TutorialCard } from '../../../src/webview/components/TutorialCard';
import { actions } from '../../../src/webview/store';


describe('TutorialCard', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    // Initialize and register ui-components icons and specific icon to LC
    initIcons();

    const renderTutorialCard = (
        tutorial: TutorialsEntry,
        tag: string,
        onSelectedTag: { (tag: string): void; (tag: string): void }
    ): RenderResult =>
        render(<TutorialCard tutorial={tutorial} tag={tag} loading={false} onSelectedTag={onSelectedTag} />, {
            initialState: { tutorials: withDataNoError }
        });

    test('test if the TutorialCard render is ok', () => {
        const tutorial = withDataNoError.result.data.result[0];
        const tag = 'SAP Fiori tools';
        const onSelectedTag = jest.fn();
        renderTutorialCard(tutorial, tag, onSelectedTag);

        const titleDOM = screen.getByText(/Test title/i);
        const tagDOM = screen.getByText(/SAP Fiori tools/i);

        expect(titleDOM.className).toEqual('tutorial-card-title');
        expect(tagDOM.parentElement?.className).toEqual('tags-tutorial-tag');
    });

    test('test if the TutorialCard render with the featured tag', () => {
        const dataTuto = withDataNoError.result.data.result[0];
        dataTuto.featured = true;
        const tutorial = dataTuto;
        const tag = 'SAP Fiori tools';
        const onSelectedTag = jest.fn();
        renderTutorialCard(tutorial, tag, onSelectedTag);

        const featuredDOM = screen.getByText(/Featured/i);

        expect(featuredDOM.className).toEqual('featured-text');
        const logTelemetryEventSpy = jest.spyOn(actions, 'logOpenTutorialTelemetryEvent');
        if (featuredDOM) {
            // Simulate click

            fireEvent(
                screen.getByTestId('tutorial-card-link'),
                new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                }),
            )
            expect(logTelemetryEventSpy).toBeCalledTimes(1);
        }
    });
});
