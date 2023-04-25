import React from 'react';
import type { FC } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { Home } from '../home';
import { Tutorials } from '../tutorials';
import { Blogs } from '../blogs';
import { Tags } from '../tags';

export const RoutesWithAnimation: FC = (): JSX.Element => {
    const location = useLocation();
    const locationArr = location.pathname?.split('/') ?? [];

    return (
        <AnimatePresence>
            <Routes location={location} key={locationArr[1]}>
                <Route path="/" element={<Home />} />
                <Route
                    path="/blogs/*"
                    element={
                        <AnimatePresence initial={true}>
                            <Routes location={location} key={locationArr[2]}>
                                <Route path="/*" element={<Blogs />} />
                                <Route path=":tagId" element={<Blogs />} />
                                <Route path="tags" element={<Tags />} />
                            </Routes>
                        </AnimatePresence>
                    }
                />
                <Route path="/tutorials" element={<Tutorials />} />
                <Route path="/tutorials/:tagId" element={<Tutorials />} />
            </Routes>
        </AnimatePresence>
    );
};
