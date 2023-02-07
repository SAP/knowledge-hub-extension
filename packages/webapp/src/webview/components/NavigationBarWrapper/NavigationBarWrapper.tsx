import React from 'react';
import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { tabs } from '../../routes/config';
import { NavigationBar } from '../NavigationBar';

export const NavigationBarWrapper: FC = (): JSX.Element => {
    return (
        <React.Fragment>
            <NavigationBar tabs={tabs} />
            <Outlet />
        </React.Fragment>
    );
};
