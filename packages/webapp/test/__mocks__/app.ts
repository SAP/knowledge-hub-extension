import { App } from '@sap/knowledge-hub-extension-types';

export const appInitialState: App = {
    app: {
        appFilters: {},
        appId: ''
    },
    ui: {
        ready: false,
        tabs: {}
    }
};

export const appStateTabs = {
    blogs: {
        ariaLabel: 'BLOGS_TAB',
        count: -1,
        headerText: '',
        key: 'blogs',
        path: '/blogs'
    },
    home: {
        ariaLabel: 'HOME_TAB',
        count: -1,
        headerText: '',
        key: 'home',
        path: '/'
    },
    tutorials: {
        ariaLabel: 'TUTORIALS_TAB',
        count: -1,
        headerText: '',
        key: 'tutorials',
        path: '/tutorials'
    }
};
