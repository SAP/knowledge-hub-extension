import React from 'react';

import { configureStore } from '@reduxjs/toolkit';
import { render as rtlRender } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';

import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

import { reducer } from '../../src/webview/store/reducer';
import type { RootState } from '../../src/webview/store/store';

import { appInitialState } from '../../test/__mocks__/app';
import { homeInitialState } from '../../test/__mocks__/home';
import { tutorialsInitialState } from '../../test/__mocks__/tutorials';
import { tagsInitialState } from '../../test/__mocks__/tags';
import { blogsInitialState } from '../../test/__mocks__/blogs';
import { searchInitialState } from '../../test/__mocks__/search';

import i18nMock from './i18n';

interface WrapperProps {
    children?: React.ReactNode;
}

function renderWithRouter(ui: any, { route = '/', initialState = {} } = {}): RenderResult {
    window.history.pushState({}, '/', route);
    const store = configureStore({ reducer: reducer, preloadedState: initialState });

    const Wrapper = ({ children }: WrapperProps) => {
        return (
            <Provider store={store}>
                <I18nextProvider i18n={i18nMock}>
                    <MemoryRouter>{children}</MemoryRouter>
                </I18nextProvider>
            </Provider>
        );
    };

    return rtlRender(ui, { wrapper: Wrapper });
}

function render(ui: any, { initialState = {} } = {}): RenderResult {
    const store = configureStore({ reducer: reducer, preloadedState: initialState });

    const Wrapper = ({ children }: WrapperProps) => {
        return (
            <Provider store={store}>
                <I18nextProvider i18n={i18nMock}>{children}</I18nextProvider>
            </Provider>
        );
    };

    return rtlRender(ui, { wrapper: Wrapper });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render, renderWithRouter };

export const rootState: RootState = {
    app: appInitialState,
    home: homeInitialState,
    tutorials: tutorialsInitialState,
    tags: tagsInitialState,
    blogs: blogsInitialState,
    search: searchInitialState
};
