import React from 'react';

import type { TabsConfig } from '@sap/knowledge-hub-extension-types';
import type { IPivotProps, IPivotStyles, IPivotItemProps } from '@fluentui/react';
import { Pivot, PivotItem, Icon } from '@fluentui/react';
import { UIBadge } from '../UIBadge';

export { PivotItem as UITabsItem };

import './UITabs.scss';

export interface UITabsProps extends IPivotProps {
    items: TabsConfig;
}
/**
 * UITabs component.
 * based on https://developer.microsoft.com/en-us/fluentui#/controls/web/pivot
 *
 * @exports
 * @class UITabs
 * @extends {React.Component<IPivotProps, {}>}
 */
export class UITabs extends React.Component<UITabsProps, {}> {
    /**
     * Initializes component properties.
     *
     * @param {UITabsProps} props component properties.
     */
    public constructor(props: UITabsProps) {
        super(props);
    }

    protected setTabsStyle = (): Partial<IPivotStyles> => {
        const activeForegroundColor = 'var(--vscode-tab-activeForeground)';
        return {
            root: {
                color: activeForegroundColor,
                borderBottom: '1px solid var(--vscode-dropdown-border)'
            },
            link: {
                color: 'var(--vscode-tab-inactiveForeground)',
                selectors: {
                    '&:active, &:hover': {
                        backgroundColor: 'transparent',
                        color: activeForegroundColor
                    }
                }
            },
            linkIsSelected: {
                color: activeForegroundColor,
                selectors: {
                    '&:before': {
                        height: 1,
                        transition: 'none',
                        left: 0,
                        right: 0,
                        backgroundColor: 'var(--vscode-inputOption-activeForeground)'
                    }
                }
            },
            linkContent: {},
            text: {
                fontFamily: 'var(--vscode-font-family)',
                fontSize: 13
            }
        };
    };

    renderLinkContent = (link?: IPivotItemProps): JSX.Element | null => {
        if (!link) {
            return null;
        }

        const { itemCount, itemIcon, headerText } = link;
        return (
            <span className="ui-tabs-linkContent">
                {itemIcon !== undefined && (
                    <span className="ui-tabs-linkContent-icon">
                        <Icon iconName={itemIcon} />
                    </span>
                )}
                {headerText !== undefined && <span className="ui-tabs-linkContent-text">{link.headerText}</span>}
                {itemCount !== undefined && itemCount !== -1 && (
                    <span className="ui-tabs-linkContent-count">
                        <UIBadge text={itemCount} />
                    </span>
                )}
            </span>
        );
    };

    /**
     * @returns {JSX.Element} component render.
     */
    render(): JSX.Element {
        return (
            <Pivot {...this.props} styles={this.setTabsStyle()}>
                {Object.keys(this.props.items).map((key: string) => {
                    return (
                        <PivotItem
                            headerText={this.props.items[key].headerText}
                            key={this.props.items[key].key}
                            itemKey={this.props.items[key].key}
                            itemCount={this.props.items[key].count}
                            onRenderItemLink={this.renderLinkContent}></PivotItem>
                    );
                })}
            </Pivot>
        );
    }
}

// className="ui-tabs"
// itemCount={this.props.items[key].count}
// onRenderItemLink={this.renderLinkContent}
