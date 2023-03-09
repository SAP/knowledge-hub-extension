import React from 'react';
import type { FC } from 'react';

import { UILoader } from '@sap-ux/ui-components';

import './Loader.scss';

export type LoaderProps = {
    label?: string;
    blockDOM?: boolean;
    delayed?: boolean;
};

export const Loader: FC<LoaderProps> = ({ label, blockDOM, delayed }): JSX.Element => {
    return (
        <div className="loader">
            <UILoader
                blockDOM={blockDOM}
                delayed={delayed}
                label={label}
                labelPosition="bottom"
                className={'uiLoaderXLarge'}
            />
        </div>
    );
};
