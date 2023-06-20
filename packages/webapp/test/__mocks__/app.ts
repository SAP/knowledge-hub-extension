import { App } from '@sap/knowledge-hub-extension-types';

export const appStateTabsBlogs = {
    ariaLabel: 'BLOGS_TAB',
    count: -1,
    headerText: '',
    key: 'blogs',
    path: '/blogs'
};

export const appStateTabsBlogsWithCount = {
    ariaLabel: 'BLOGS_TAB',
    count: 10,
    headerText: '',
    key: 'blogs',
    path: '/blogs'
};

export const appStateTabsHome = {
    ariaLabel: 'HOME_TAB',
    count: -1,
    headerText: '',
    key: 'home',
    path: '/'
};

export const appStateTabsTutorials = {
    ariaLabel: 'TUTORIALS_TAB',
    count: -1,
    headerText: '',
    key: 'tutorials',
    path: '/tutorials'
};

export const appStateTabsTutorialsWithCount = {
    ariaLabel: 'TUTORIALS_TAB',
    count: 10,
    headerText: '',
    key: 'tutorials',
    path: '/tutorials'
};

export const appStateTabsBlogsWithText = {
    ariaLabel: 'BLOGS_TAB',
    count: -1,
    headerText: 'BLOGS_TAB',
    key: 'blogs',
    path: '/blogs'
};

export const appStateTabsHomeWithText = {
    ariaLabel: 'HOME_TAB',
    count: -1,
    headerText: 'HOME_TAB',
    key: 'home',
    path: '/'
};

export const appStateTabsTutorialsWithText = {
    ariaLabel: 'TUTORIALS_TAB',
    count: -1,
    headerText: 'TUTORIALS_TAB',
    key: 'tutorials',
    path: '/tutorials'
};

export const appStateTabs = {
    blogs: appStateTabsBlogs,
    home: appStateTabsHome,
    tutorials: appStateTabsTutorials
};

export const appStateTabsWithText = {
    blogs: appStateTabsBlogsWithText,
    home: appStateTabsHomeWithText,
    tutorials: appStateTabsTutorialsWithText
};

export const appStateTabsWithBlogsCount = {
    blogs: appStateTabsBlogsWithCount,
    home: appStateTabsHome,
    tutorials: appStateTabsTutorials
};

export const appStateTabsWithTutorialsCount = {
    blogs: appStateTabsBlogs,
    home: appStateTabsHome,
    tutorials: appStateTabsTutorialsWithCount
};

//

export const appInitialState: App = {
    app: {
        appFilters: {},
        appId: ''
    },
    ui: {
        ready: false,
        tabs: appStateTabs
    }
};

export const appInitialStateReady: App = {
    app: {
        appFilters: {},
        appId: ''
    },
    ui: {
        ready: true,
        tabs: appStateTabsWithText
    }
};

export const appStateWithTabsWithBlogsCount = {
    app: {
        appFilters: {},
        appId: ''
    },
    ui: {
        ready: false,
        tabs: appStateTabsWithBlogsCount
    }
};

export const appStateWithTabsWithTutorialsCount = {
    app: {
        appFilters: {},
        appId: ''
    },
    ui: {
        ready: false,
        tabs: appStateTabsWithTutorialsCount
    }
};
