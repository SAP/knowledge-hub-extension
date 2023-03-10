import React, { useCallback, useState, useEffect } from 'react';
import type { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { PathType } from '@sap/knowledge-hub-extension-types';

import { UITabs } from '@sap-ux/ui-components';
import type { UITabsItem } from '@sap-ux/ui-components';
import { Search } from '../../features/search';

import type { TabsConfig } from '../../routes/config';

import './NavigationBar.scss';

export type NavigationBarProps = {
    tabs: TabsConfig[];
};

export const NavigationBar: FC<NavigationBarProps> = ({ tabs }: NavigationBarProps): JSX.Element => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const [items, setItems] = useState<string[]>();
    const [selectedTab, setSelectedTab] = useState<string>();
    const [selectedTabKey, setSelectedKey] = useState<string>(PathType.HOME);

    useEffect(() => {
        const allTabs: string[] = [];
        tabs.forEach((tab: TabsConfig) => {
            if (tab.text) {
                allTabs.push(t(tab.text));
            }
        });
        setItems(allTabs);
    }, [tabs]);

    useEffect(() => {
        if (location.pathname) {
            tabs.forEach((tab: TabsConfig) => {
                if (tab.path === location.pathname && tab.text) {
                    setSelectedTab(t(tab.text));
                    setSelectedKey(tab.key);
                }
            });
        }
    }, [location]);

    const handleOnClick = useCallback(
        (item?: UITabsItem | undefined): void => {
            let fullPath = '/';
            if (item) {
                if (item.props.headerText !== t('HOME_TAB')) {
                    tabs.forEach((tab: TabsConfig) => {
                        if (tab.text && t(tab.text) === item.props.headerText) {
                            fullPath = tab.path;
                            setSelectedTab(item.props.headerText);
                            setSelectedKey(tab.key);
                        }
                    });
                }
                navigate(fullPath);
            }
        },
        [history]
    );

    return (
        <React.Fragment>
            {items && (
                <div className="navigation-bar" data-testid="navigation-bar">
                    <UITabs
                        linkSize="large"
                        onLinkClick={handleOnClick}
                        items={items}
                        selectedKey={selectedTab}
                        className="navigation-bar__tabs"
                    />
                    <div className="navigation-bar__search">
                        <Search type={selectedTabKey} />
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};
