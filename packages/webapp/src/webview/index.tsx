import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { App } from './features/app';
import { store, actions } from './store';

import './i18n';

import { initIcons } from '@sap-ux/ui-components';

import '@sap-ux/ui-components/dist/styles/ui-components.scss';

// Initialize and register ui-components icons and specific icon to LC
initIcons();

// Notify VSCode extension that web view is ready
actions.knowledgeHubWebViewReady();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
