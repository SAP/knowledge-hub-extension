import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Loader } from '../../components/Loader';
import type { TabsConfig } from '@sap/knowledge-hub-extension-types';
import { NavigationBar } from '../../components/NavigationBar';
import { RoutesWithAnimation } from './RouteWithAnimation';

import { getAppTabs, getAppReady } from '../../features/app/App.slice';
import { useAppSelector } from '../../store';
import { fetchTags } from '../tags/Tags.utils';
import { searchBlogs } from '../blogs/Blogs.utils';
import { searchTutorials } from '../tutorials/Tutorials.utils';

import './App.scss';

export const App: FC = (): JSX.Element => {
    const { t } = useTranslation();
    const activeTabs: TabsConfig = useAppSelector(getAppTabs);
    const activeReady: boolean = useAppSelector(getAppReady);
    const [ready, setReady] = useState(activeReady);

    useEffect(() => {
        setReady(activeReady);
        if (activeReady) {
            fetchTags();
            searchBlogs('');
            searchTutorials('');
        }
    }, [activeReady]);

    return (
        <div className="app-knowledge-hub">
            <div className="app-knowledge-hub-wrapper">
                <MemoryRouter>
                    {!ready && <Loader label={t('APP_LOADING_CONTENT')} />}
                    {ready && (
                        <React.Fragment>
                            <NavigationBar tabs={activeTabs} />
                            <RoutesWithAnimation />
                        </React.Fragment>
                    )}
                </MemoryRouter>
            </div>
        </div>
    );
};
