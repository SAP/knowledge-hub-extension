import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { App } from './features/app';
import { store, actions } from './store';

import { fetchBlogsTags, fetchTutorialsTags } from './features/tags/Tags.utils';
import { initI18n } from './i18n';

import { initIcons } from '@sap-ux/ui-components';

import '@sap-ux/ui-components/dist/styles/ui-components.scss';

/**
 * Initialization of i18n
 */
initI18n();

// Initialize and register ui-components icons and specific icon to LC
initIcons();

// Notify VSCode extension that web view is ready
actions.knowledgeHubWebViewReady();

// Fetch tags
fetchBlogsTags();
fetchTutorialsTags();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
