import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { NavigationBar } from '../../../src/webview/components/NavigationBar';
import { tabs } from '../../../src/webview/constants/tabs';
import { renderWithRouter } from '../../../test/__mocks__/store.mock';

describe('NavigationBar', () => {
    const renderNavigationBar = (): RenderResult => {
        return renderWithRouter(<NavigationBar tabs={tabs} />);
    };

    const mockedNavigator = jest.fn();

    beforeEach(() => {
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useNavigate: () => mockedNavigator
        }));
    });

    test('test if the NavigationBar render is ok with data', () => {
        renderNavigationBar();

        const navigationBarDOM = screen.getByTestId('navigation-bar');
        expect(navigationBarDOM.className).toMatch(/navigation-bar/);

        const navigationBarTabsDOM = navigationBarDOM.querySelector('.navigation-bar__tabs');
        expect(navigationBarTabsDOM).toBeTruthy();

        const navigationBarTabsListDOM = navigationBarTabsDOM?.querySelectorAll('button');
        expect(navigationBarTabsListDOM?.length).toEqual(3);
    });

    test('test if the NavigationBar render is ok when the tab is clicked', () => {
        renderNavigationBar();

        const navigationBarDOM = screen.getByTestId('navigation-bar');
        expect(navigationBarDOM.className).toMatch(/navigation-bar/);

        const navigationBarTabsDOM = navigationBarDOM.querySelector('.navigation-bar__tabs');
        expect(navigationBarTabsDOM).toBeTruthy();

        const navigationBarTabsListDOM = navigationBarTabsDOM?.querySelectorAll('button');
        expect(navigationBarTabsListDOM?.length).toEqual(3);

        const navigationBarTabDOM = navigationBarTabsListDOM?.item(0);
        expect(navigationBarTabDOM).toBeTruthy();

        if (navigationBarTabDOM) {
            act(() => {
                navigationBarTabDOM.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });
        }

        const navigationBarTabActiveDOM = navigationBarTabsListDOM?.item(0);
        expect(navigationBarTabActiveDOM).toBeTruthy();
        expect(navigationBarTabActiveDOM?.className).toContain('is-selected');
    });
});
