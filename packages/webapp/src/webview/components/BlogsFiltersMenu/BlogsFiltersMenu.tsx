import React from 'react';
import type { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import type { BlogsUiState } from '@sap/knowledge-hub-extension-types';

import { MOTION_VARIANTS_MENU } from '../../constants';
import { useAppSelector } from '../../store';
import { getBlogsUI } from '../../features/blogs/Blogs.slice';

import { BlogsFiltersMenuTags } from './BlogsFiltersMenuTags';
import { BlogsFiltersMenuLanguages } from './BlogsFiltersMenuLanguages';
import { BlogsFiltersMenuCategories } from './BlogsFiltersMenuCategories';

import './BlogsFiltersMenu.scss';

export type BlogsFiltersMenuProps = {
    loading: boolean;
};

export const BlogsFiltersMenu: FC<BlogsFiltersMenuProps> = ({ loading }): JSX.Element => {
    const activeUi: BlogsUiState = useAppSelector(getBlogsUI);
    const withSearchOn = true;
    const isSmall = false;

    return (
        <AnimatePresence initial={false}>
            {activeUi.isFiltersMenuOpened && (
                <motion.div
                    className="blogs-filters-menu"
                    custom={{ direction: 'forward' }}
                    initial="initial"
                    animate="getIn"
                    exit="getOut"
                    variants={MOTION_VARIANTS_MENU}>
                    <div data-testid="blogs-filters-menu__content" className="blogs-filters-menu__content">
                        <div className="blogs-filters-menu__content__entries">
                            <BlogsFiltersMenuCategories isSmall={isSmall} loading={loading} />
                            <BlogsFiltersMenuTags withSearchOn={withSearchOn} isSmall={isSmall} loading={loading} />
                            <BlogsFiltersMenuLanguages isSmall={isSmall} loading={loading} />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
