import { PathType } from '@sap/knowledge-hub-extension-types';
import type { TabsConfig } from '@sap/knowledge-hub-extension-types';

export const tabs: TabsConfig = {
    home: {
        key: PathType.HOME,
        path: '/',
        text: 'HOME_TAB'
    },
    tutorials: {
        key: PathType.TUTORIALS,
        path: '/tutorials',
        text: 'TUTORIALS_TAB'
    },
    blogs: {
        key: PathType.BLOGS,
        path: '/blogs',
        text: 'BLOGS_TAB'
    }
};
