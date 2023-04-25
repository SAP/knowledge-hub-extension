import { PathType } from '@sap/knowledge-hub-extension-types';
import type { TabsConfig } from '@sap/knowledge-hub-extension-types';

export const tabs: TabsConfig[] = [
    {
        key: PathType.HOME,
        path: '/',
        text: 'HOME_TAB'
    },
    {
        key: PathType.TUTORIALS,
        path: '/tutorials',
        text: 'TUTORIALS_TAB'
    },
    {
        key: PathType.BLOGS,
        path: '/blogs',
        text: 'BLOGS_TAB'
    }
];
