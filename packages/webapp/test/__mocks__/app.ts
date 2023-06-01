export const appInitialState = {
    app: {
        appFilters: {},
        appId: ''
    },
    ui: {
        ready: false,
        tabs: {
            blogs: {
                ariaLabel: 'BLOGS_TAB',
                count: -1,
                headerText: 'SAP Community Blogs',
                key: 'blogs',
                path: '/blogs'
            },
            home: {
                ariaLabel: 'HOME_TAB',
                count: -1,
                headerText: 'Home',
                key: 'home',
                path: '/'
            },
            tutorials: {
                ariaLabel: 'TUTORIALS_TAB',
                count: -1,
                headerText: 'SAP Tutorials',
                key: 'tutorials',
                path: '/tutorials'
            }
        }
    }
};
