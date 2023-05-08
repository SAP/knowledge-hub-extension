import React, { useCallback, useState, useEffect } from 'react';
import type { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { PathType } from '@sap/knowledge-hub-extension-types';
import type { TabsConfig } from '@sap/knowledge-hub-extension-types';

import { UITabs } from '@sap-ux/ui-components';
import type { UITabsItem } from '@sap-ux/ui-components';
import { Search } from '../../features/search';

import './NavigationBar.scss';

export type NavigationBarProps = {
    tabs: TabsConfig;
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
        Object.keys(tabs).forEach((key: string) => {
            if (tabs[key].text) {
                allTabs.push(t(tabs[key].text));
            }
        });
        setItems(allTabs);
    }, [tabs]);

    useEffect(() => {
        if (location.pathname) {
            Object.keys(tabs).forEach((key: string) => {
                if (tabs[key].path === location.pathname && tabs[key].text) {
                    setSelectedTab(t(tabs[key].text));
                    setSelectedKey(tabs[key].key);
                }
            });
        }
    }, [location]);

    const handleOnClick = useCallback(
        (item?: UITabsItem | undefined): void => {
            let fullPath = '/';
            if (item) {
                if (item.props.headerText !== t('HOME_TAB')) {
                    Object.keys(tabs).forEach((key: string) => {
                        if (tabs[key].text && t(tabs[key].text) === item.props.headerText) {
                            fullPath = tabs[key].path;
                            setSelectedTab(item.props.headerText);
                            setSelectedKey(tabs[key].key);
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
