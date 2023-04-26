import React, { useEffect, useState, useCallback } from 'react';
import type { FC } from 'react';
import { motion } from 'framer-motion';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { tabs, MOTION_VARIANTS_PAGE } from '../../constants';

import type {
    TutorialsState,
    TutorialsEntry,
    BlogsState,
    BlogsSearchResultContentItem,
    Tag,
    Error,
    TabsConfig
} from '@sap/knowledge-hub-extension-types';

import { TutorialCard } from '../../components/TutorialCard';
import { BlogCard } from '../../components/BlogCard';

import { useAppSelector } from '../../store';

import {
    getHomeTutorials,
    getHomeTutorialsPending,
    getHomeTutorialsError,
    getHomeBlogs,
    getHomeBlogsPending,
    getHomeBlogsError
} from './Home.slice';
import { getTutorialsTag } from '../tutorials/Tutorials.utils';

import { UILink } from '@sap-ux/ui-components';

import './Home.scss';

export const Home: FC = (): JSX.Element => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const homeTutorials: TutorialsState | null = useAppSelector(getHomeTutorials);
    const homeTutorialsLoading: boolean = useAppSelector(getHomeTutorialsPending);
    const homeTutorialsError: Error = useAppSelector(getHomeTutorialsError);

    const homeBlogs: BlogsState = useAppSelector(getHomeBlogs);
    const homeBlogsLoading: boolean = useAppSelector(getHomeBlogsPending);
    const homeBlogsError: Error = useAppSelector(getHomeBlogsError);

    const [tutorials, setTutorials] = useState<TutorialsEntry[]>();
    const [blogs, setBlogs] = useState<BlogsSearchResultContentItem[]>();

    const handleOnClickViewMore = useCallback(
        (path: string) => (event: any) => {
            navigate(path);
        },
        []
    );

    const onBlogTagSelected = useCallback((tag: Tag): void => {
        navigate(tabs['blogs'].path, { state: { tagId: tag.guid } });
    }, []);

    const onTutorialTagSelected = useCallback((tagId: string): void => {
        navigate(tabs['tutorials'].path, { state: { tagId: tagId } });
    }, []);

    useEffect(() => {
        if (homeBlogs && !homeTutorialsError.isError && homeBlogs.totalCount) {
            setBlogs(homeBlogs.data);
        }
    }, [homeBlogs, homeBlogsLoading, homeTutorialsError]);

    useEffect(() => {
        if (homeTutorials && !homeTutorialsError.isError && homeTutorials.data.numFound) {
            setTutorials(homeTutorials.data.result);
        }
    }, [homeTutorials, homeTutorialsLoading, homeTutorialsError]);

    return (
        <motion.div
            className="home"
            custom={{ direction: 'forward' }}
            initial="initial"
            animate="getIn"
            exit="getOut"
            variants={MOTION_VARIANTS_PAGE}>
            <div className="home-header">
                <h2 className="ui-large-header home-header-title">{t('HOME_TITLE')}</h2>
                <h3 className="ui-small-header home-header-description">{t('HOME_DESCRIPTION')}</h3>
            </div>
            <div className="home-content">
                <div className="home-content-tutorials-wrapper">
                    <div className="home-content-tutorials-container">
                        <div className="home-content-tutorials-container-header">
                            <h2 className="ui-medium-header home-content-tutorials-container-header-title">
                                {t('TUTORIALS_TITLE')}
                            </h2>
                            <span className="home-content-tutorials-container-header-link">
                                <UILink
                                    title={t('LNK_VIEW_ALL')}
                                    href="#"
                                    onClick={handleOnClickViewMore('/tutorials')}
                                    onKeyDown={handleOnClickViewMore('/tutorials')}>
                                    {t('LNK_VIEW_ALL')}
                                </UILink>
                            </span>
                        </div>
                        <div className="home-content-tutorials-container-content">
                            {!(homeTutorialsLoading || homeTutorialsError.isError) &&
                                tutorials &&
                                tutorials.map((tutorial, index) => {
                                    return (
                                        <TutorialCard
                                            key={tutorial.imsId}
                                            tutorial={tutorial}
                                            tag={getTutorialsTag(tutorial.primaryTag, homeTutorials.data)}
                                            tags={homeTutorials.data.tags}
                                            loading={homeTutorialsLoading}
                                            onSelectedTag={onTutorialTagSelected}
                                        />
                                    );
                                })}
                            {homeTutorialsLoading && (
                                <TutorialCard loading={homeTutorialsLoading} onSelectedTag={onTutorialTagSelected} />
                            )}
                        </div>
                    </div>
                </div>
                <div className="home-content-blogs-wrapper">
                    <div className="home-content-blogs-container">
                        <div className="home-content-blogs-container-header">
                            <h3 className="ui-medium-header home-content-blogs-container-header-title">
                                {t('BLOGS_TITLE')}
                            </h3>
                            <span className="home-content-blogs-container-header-link">
                                <UILink
                                    title={t('LNK_VIEW_ALL')}
                                    href="#"
                                    onClick={handleOnClickViewMore('/blogs')}
                                    onKeyDown={handleOnClickViewMore('/blogs')}>
                                    {t('LNK_VIEW_ALL')}
                                </UILink>
                            </span>
                        </div>
                        <div className="home-content-blogs-container-content">
                            {!(homeBlogsLoading || homeBlogsError.isError) &&
                                blogs &&
                                blogs.map((blog, index) => {
                                    return <BlogCard key={blog.id} blog={blog} onSelectedTag={onBlogTagSelected} />;
                                })}
                            {homeBlogsLoading && (
                                <BlogCard loading={homeBlogsLoading} onSelectedTag={onBlogTagSelected} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
