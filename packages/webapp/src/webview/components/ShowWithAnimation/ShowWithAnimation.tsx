import React from 'react';
import type { FC } from 'react';

import { useDelayUnmount } from './ShowWithAnimation.hook';

import './ShowWithAnimation.scss';

interface ShowWithAnimationProps extends React.PropsWithChildren {
    isMounted: boolean;
}

export const ShowWithAnimation: FC<ShowWithAnimationProps> = ({ children, isMounted }): JSX.Element => {
    const showDiv = useDelayUnmount(isMounted, 450);
    const mountedStyle = { flexGrow: 1, animation: 'inAnimation 450ms ease-in' };
    const unmountedStyle = {
        flexGrow: 1,
        animation: 'outAnimation 470ms ease-out',
        animationFillMode: 'forwards'
    };

    return (
        <React.Fragment>
            {showDiv && <div style={isMounted ? mountedStyle : unmountedStyle}>{children}</div>}
        </React.Fragment>
    );
};
