import React, { useEffect } from 'react';
import type { FC } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { tabs } from '../../constants';
import { NavigationBar } from '../../components/NavigationBar';
import { RoutesWithAnimation } from './RouteWithAnimation';

import { fecthHomeBlogs, fecthHomeTutorials, fetchTags } from '../home/home.utils';

import './App.scss';

export const App: FC = (): JSX.Element => {
    useEffect(() => {
        fecthHomeBlogs();
        fecthHomeTutorials();
        fetchTags();
    }, []);

    return (
        <div className="app-knowledge-hub">
            <div className="app-knowledge-hub-wrapper">
                <MemoryRouter>
                    <NavigationBar tabs={tabs} />
                    <RoutesWithAnimation />
                </MemoryRouter>
            </div>
        </div>
    );
};
