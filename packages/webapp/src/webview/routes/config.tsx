import React from 'react';
import type { RouteObject } from 'react-router-dom';

import { PathType } from '@sap/knowledge-hub-extension-types';

import { NavigationBarWrapper } from '../components/NavigationBarWrapper';

import { Home } from '../features/home';
import { Tutorials } from '../features/tutorials';
import { Videos } from '../features/videos';
import { Blogs } from '../features/blogs';
import { fecthHomeBlogs, fecthHomeTutorials, fetchTags } from '../features/home/home.utils';

export type TabsConfig = {
    key: string;
    path: string;
    text?: string;
};

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

export const myRoutes: RouteObject[] = [
    {
        path: '/',
        element: <NavigationBarWrapper />,
        children: [
            {
                path: '/',
                element: <Home />,
                loader: () => {
                    fecthHomeBlogs();
                    fecthHomeTutorials();
                    fetchTags();
                },
                shouldRevalidate: () => {
                    return false;
                }
            },
            {
                path: '/blogs',
                children: [
                    {
                        index: true,
                        element: <Blogs />
                    },
                    {
                        path: ':tagId',
                        element: <Blogs />
                    }
                ]
            },
            {
                path: '/tutorials',
                children: [
                    {
                        index: true,
                        element: <Tutorials />
                    },
                    {
                        path: ':tagId',
                        element: <Tutorials />
                    }
                ]
            },
            {
                path: '/videos',
                element: <Videos />
            }
        ]
    }
];
