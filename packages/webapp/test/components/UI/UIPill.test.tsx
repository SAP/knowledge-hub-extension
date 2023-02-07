import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { initIcons } from '@sap-ux/ui-components';
import { initLCIcons } from '../../../src/webview/Icons/icons';

import { render } from '../../__mocks__/store.mock';
import { UIPill } from '../../../src/webview/components/UI/UIPill';

describe('UI > UIPill', () => {
    // Initialize and register ui-components icons and specific icon to LC
    initIcons();
    initLCIcons();

    const renderUIPill = (
        pillTxt: string,
        pillId: string,
        callback: { (pillId: string): void; (pillId: string): void }
    ): RenderResult => render(<UIPill pillId={pillId} pillTxt={pillTxt} callback={callback} />);

    test('test if the UIPill text is rendered', () => {
        const pill = {
            txt: 'Test',
            id: 'test'
        };
        const callbackfn = jest.fn();

        act(() => {
            renderUIPill(pill.txt, pill.id, callbackfn);
        });

        const uiPillTitleDOM = screen.getByText(/Test/i);
        expect(uiPillTitleDOM.className).toEqual('ui-pill-name ui-small-text');

        const pillDOM = document.querySelector('[data-testid=ui-pill-test]');
        expect(pillDOM).toBeTruthy();

        if (pillDOM) {
            act(() => {
                pillDOM.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });
            expect(callbackfn).toHaveBeenCalledWith(pill.id);
        }
    });
});
