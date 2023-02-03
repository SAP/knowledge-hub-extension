import React from 'react';
import type { FC } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { myRoutes } from '../../routes/config';

import './App.scss';

export const App: FC = (): JSX.Element => {
    const myRouter = createMemoryRouter(myRoutes, {
        initialEntries: ['/'],
        initialIndex: 1
    });

    return (
        <div className="app-knowledge-hub">
            <div className="app-knowledge-hub-wrapper">
                <RouterProvider router={myRouter} />
            </div>
        </div>
    );
};
