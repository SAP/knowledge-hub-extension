import React from 'react';

import { configureStore } from '@reduxjs/toolkit';
import { render as rtlRender } from '@testing-library/react';
import type { RenderResult } from '@testing-library/react';

import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { reducer } from '../../src/webview/store/reducer';
import { I18nextProvider } from 'react-i18next';

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
