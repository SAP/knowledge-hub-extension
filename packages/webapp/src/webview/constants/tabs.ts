import { PathType } from '@sap/knowledge-hub-extension-types';
import type { TabsConfig } from '@sap/knowledge-hub-extension-types';

export const tabs: TabsConfig = {
    home: {
        key: PathType.HOME,
        path: '/',
        headerText: 'HOME_TAB',
        ariaLabel: 'HOME_TAB',
        count: 0
    },
    tutorials: {
        key: PathType.TUTORIALS,
        path: '/tutorials',
        headerText: 'TUTORIALS_TAB',
        ariaLabel: 'TUTORIALS_TAB',
        count: 0
    },
    blogs: {
        key: PathType.BLOGS,
        path: '/blogs',
        headerText: 'BLOGS_TAB',
        ariaLabel: 'BLOGS_TAB',
        count: 0
    }
};
