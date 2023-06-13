import React, { useEffect, useState, useCallback } from 'react';
import type { FC } from 'react';
import { motion } from 'framer-motion';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { tabs, MOTION_VARIANTS_PAGE } from '../../constants';

import type {
    TutorialsSearchResult,
    TutorialsEntry,
    BlogsSearchResult,
    BlogsSearchResultContentItem,
    BlogFiltersEntry,
    Tag,
    Error
} from '@sap/knowledge-hub-extension-types';

import { TutorialCard } from '../../components/TutorialCard';
import { TutorialsFiltersBar } from '../../components/TutorialsFiltersBar';
import { BlogCard } from '../../components/BlogCard';
import { BlogsFiltersBar } from '../../components/BlogsFiltersBar';
import { WithError } from '../../components/WithError';

import { useAppSelector } from '../../store';

import {
    getHomeTutorials,
    getHomeTutorialsPending,
    getHomeTutorialsError,
    getHomeBlogs,
    getHomeBlogsPending,
    getHomeBlogsError
} from './Home.slice';
import { getBlogsUIFiltersEntries, getBlogsTotalCount } from '../../features/blogs/Blogs.slice';
import { getTutorialsQueryFilters, getTutorialsTotalCount } from '../../features/tutorials/Tutorials.slice';
import { getTutorialsTag } from '../tutorials/Tutorials.utils';

import { UILink } from '@sap-ux/ui-components';

import './Home.scss';

export const Home: FC = (): JSX.Element => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const homeTutorials: TutorialsSearchResult = useAppSelector(getHomeTutorials);
    const homeTutorialsLoading: boolean = useAppSelector(getHomeTutorialsPending);
    const homeTutorialsError: Error = useAppSelector(getHomeTutorialsError);
    const homeTutorialsActiveFiltersEntries = useAppSelector(getTutorialsQueryFilters);
    const homeTutorialsActiveTotalCount = useAppSelector(getTutorialsTotalCount);
    const [homeTutorialsFiltersEntries, setHomeTutorialsFiltersEntries] = useState<string[]>([]);

    const homeBlogs: BlogsSearchResult = useAppSelector(getHomeBlogs);
    const homeBlogsLoading: boolean = useAppSelector(getHomeBlogsPending);
    const homeBlogsError: Error = useAppSelector(getHomeBlogsError);
    const homeBlogsActiveFiltersEntries = useAppSelector(getBlogsUIFiltersEntries);
    const homeBlogsActiveTotalCount = useAppSelector(getBlogsTotalCount);
    const [homeBlogsFiltersEntries, setHomeBlogsFiltersEntries] = useState<BlogFiltersEntry[]>([]);

    const [tutorials, setTutorials] = useState<TutorialsEntry[]>();
    const [blogs, setBlogs] = useState<BlogsSearchResultContentItem[]>();

    const handleOnClickViewMore = useCallback(
        (path: string) => (_: any) => {
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
        if (homeBlogs && !homeBlogsError.isError && homeBlogs.totalCount) {
            setBlogs(homeBlogs.contentItems);
        }
    }, [homeBlogs, homeBlogsLoading, homeBlogsError]);

    useEffect(() => {
        if (homeTutorials && !homeTutorialsError.isError && homeTutorials.data.numFound) {
            setTutorials(homeTutorials.data.result);
        }
    }, [homeTutorials, homeTutorialsLoading, homeTutorialsError]);

    useEffect(() => {
        setHomeBlogsFiltersEntries(homeBlogsActiveFiltersEntries);
    }, [homeBlogsActiveFiltersEntries]);

    useEffect(() => {
        setHomeTutorialsFiltersEntries(homeTutorialsActiveFiltersEntries);
    }, [homeTutorialsActiveFiltersEntries]);

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
                            {!(homeTutorialsLoading || homeTutorialsError.isError) && (
                                <span className="home-content-tutorials-container-header-link">
                                    <UILink
                                        title={t('LNK_VIEW_ALL')}
                                        href="#"
                                        onClick={handleOnClickViewMore('/tutorials')}
                                        onKeyDown={handleOnClickViewMore('/tutorials')}>
                                        {homeTutorialsFiltersEntries.length === 0
                                            ? t('LNK_VIEW_ALL')
                                            : t('LNK_VIEW_MORE_RESULTS', { results: homeTutorialsActiveTotalCount })}
                                    </UILink>
                                </span>
                            )}
                        </div>
                        {!(homeTutorialsLoading || homeTutorialsError.isError) && (
                            <div className="home-content-tutorials-container-filter-bar">
                                <TutorialsFiltersBar editable={false} />
                            </div>
                        )}
                        <div className="home-content-tutorials-container-content">
                            {!(homeTutorialsLoading || homeTutorialsError.isError) &&
                                tutorials &&
                                tutorials.slice(0, 3).map((tutorial, _) => {
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
                            {homeTutorialsError.isError && !homeTutorialsLoading && <WithError />}
                        </div>
                    </div>
                </div>
                <div className="home-content-blogs-wrapper">
                    <div className="home-content-blogs-container">
                        <div className="home-content-blogs-container-header">
                            <h3 className="ui-medium-header home-content-blogs-container-header-title">
                                {t('BLOGS_TITLE')}
                            </h3>
                            {!(homeBlogsLoading || homeBlogsError.isError) && (
                                <span className="home-content-blogs-container-header-link">
                                    <UILink
                                        title={t('LNK_VIEW_ALL')}
                                        href="#"
                                        onClick={handleOnClickViewMore('/blogs')}
                                        onKeyDown={handleOnClickViewMore('/blogs')}>
                                        {homeBlogsFiltersEntries.length === 0
                                            ? t('LNK_VIEW_ALL')
                                            : t('LNK_VIEW_MORE_RESULTS', { results: homeBlogsActiveTotalCount })}
                                    </UILink>
                                </span>
                            )}
                        </div>
                        {!(homeBlogsLoading || homeBlogsError.isError) && (
                            <div className="home-content-blogs-container-filter-bar">
                                <BlogsFiltersBar editable={false} />
                            </div>
                        )}
                        <div className="home-content-blogs-container-content">
                            {!(homeBlogsLoading || homeBlogsError.isError) &&
                                blogs &&
                                blogs.slice(0, 3).map((blog, _) => {
                                    return <BlogCard key={blog.id} blog={blog} onSelectedTag={onBlogTagSelected} />;
                                })}
                            {homeBlogsLoading && (
                                <BlogCard loading={homeBlogsLoading} onSelectedTag={onBlogTagSelected} />
                            )}
                            {homeBlogsError.isError && !homeBlogsLoading && <WithError />}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
