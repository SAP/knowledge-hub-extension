import React, { useCallback, useState, useEffect } from 'react';
import type { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { PathType } from '@sap/knowledge-hub-extension-types';
import type { TabsConfig } from '@sap/knowledge-hub-extension-types';

import { UITabs } from '../../components/UI/UITabs';
import type { UITabsItem } from '@sap-ux/ui-components';
import { Search } from '../../features/search';

import './NavigationBar.scss';

export type NavigationBarProps = {
    tabs: TabsConfig;
};

export const NavigationBar: FC<NavigationBarProps> = ({ tabs }: NavigationBarProps): JSX.Element => {
    const navigate = useNavigate();
    const location = useLocation();

    const [selectedKey, setSelectedKey] = useState<string>(PathType.HOME);

    useEffect(() => {
        if (location.pathname) {
            Object.keys(tabs).forEach((key: string) => {
                if (tabs[key].path === location.pathname && tabs[key].headerText) {
                    setSelectedKey(tabs[key].key);
                }
            });
        }
    }, [location]);

    const handleOnClick = useCallback(
        (selectedTab?: UITabsItem | undefined): void => {
            if (selectedTab?.props.itemKey) {
                setSelectedKey(tabs[selectedTab.props.itemKey].key);
                navigate(tabs[selectedTab.props.itemKey].path);
            }
        },
        [history, tabs]
    );

    return (
        <div className="navigation-bar" data-testid="navigation-bar">
            <UITabs
                linkSize="normal"
                onLinkClick={handleOnClick}
                items={tabs}
                selectedKey={selectedKey}
                className="navigation-bar__tabs"
            />
            <div className="navigation-bar__search">
                <Search type={selectedKey} />
            </div>
        </div>
    );
};
