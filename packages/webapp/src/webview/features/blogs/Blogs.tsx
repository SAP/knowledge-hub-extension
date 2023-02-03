import React, { useState, useEffect, useCallback } from 'react';
import type { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import type {
    BlogsState,
    BlogsSearchQuery,
    BlogsSearchResultContentItem,
    BlogsManagedTag
} from '@sap/knowledge-hub-extension-types';

import { BlogCard } from '../../components/BlogCard';
import { BlogFilters } from '../../components/BlogFilters';
import { NoResult } from '../../components/NoResult';
import { WithError } from '../../components/WithError';

import {
    blogsPageChanged,
    blogsManagedTagsAdd,
    blogsTagsAdd,
    blogsManagedTagsDeleteAll,
    blogsManagedTagsDelete
} from '../../store/actions';
import { actions, useAppSelector } from '../../store';
import { getBlogs, getBlogsUI, getManagedTags } from './Blogs.slice';
import { isManagedTag, getBlogsTagById } from './blogs.utils';
import { getHomeBlogsTags } from '../home/Home.slice';
import { getSearchTerm } from '../search/Search.slice';

import type { UIPaginationSelected } from '../../components/UI/UIPagination';
import { UIPagination } from '../../components/UI/UIPagination';
import { UILoader } from '@sap-ux/ui-components';

import './Blogs.scss';

export const Blogs: FC = (): JSX.Element => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const maxDisplayPage = 500;

    const activeBlogs: BlogsState = useAppSelector(getBlogs);
    const activeUI: BlogsSearchQuery = useAppSelector(getBlogsUI);
    const activeSearchTerm: string = useAppSelector(getSearchTerm);
    const activeManagedTags: string[] = useAppSelector(getManagedTags) || [];
    const homeBlogsTag = useAppSelector(getHomeBlogsTags);

    const [loading, setLoading] = useState(true);
    const [noResult, setNoResult] = useState(true);
    const [error, setError] = useState(false);
    const [blogs, setBlogs] = useState<BlogsSearchResultContentItem[]>();
    const [totalPage, setTotalPage] = useState(0);
    const [totalEntries, setTotalEntries] = useState(0);
    const [pageOffset, setPageOffset] = useState(activeUI.page);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchData = (option: BlogsSearchQuery) => {
        const options = Object.assign({}, activeUI, option);
        setLoading(true);
        actions.blogsFetchBlogs(options, false);
    };

    const handlePageClick = useCallback((event: UIPaginationSelected) => {
        const options: BlogsSearchQuery = {};
        options.page = event.selected;

        dispatch(blogsPageChanged(event.selected));
        setPageOffset(event.selected);

        fetchData(options);
    }, []);

    const onTagSelected = useCallback((tag: BlogsManagedTag): void => {
        const options: BlogsSearchQuery = {};
        options.managedTags = Object.assign([], activeManagedTags);
        if (options.managedTags && options.managedTags.length > 0) {
            options.managedTags.push(tag.guid);
        } else {
            options.managedTags = [tag.guid];
        }

        dispatch(blogsManagedTagsAdd(tag.guid));
        dispatch(blogsTagsAdd(tag));

        fetchData(options);
    }, []);

    const onClearAllTagFilter = useCallback((): void => {
        const options: BlogsSearchQuery = {};
        options.managedTags = [];

        if (searchTerm !== '') {
            options.searchTerm = activeSearchTerm;
        }

        dispatch(blogsManagedTagsDeleteAll(null));

        fetchData(options);
    }, []);

    const onClearTagFilter = useCallback((tagId: string): void => {
        const options: BlogsSearchQuery = {};
        options.managedTags = Object.assign([], activeManagedTags);

        if (options.managedTags && options.managedTags.length > 0) {
            const newTags = options.managedTags.filter((element: string) => element !== tagId);
            options.managedTags = newTags;
        }

        if (searchTerm !== '') {
            options.searchTerm = activeSearchTerm;
        }

        dispatch(blogsManagedTagsDelete(tagId));

        fetchData(options);
    }, []);

    useEffect(() => {
        if (searchTerm !== activeSearchTerm) {
            const options: BlogsSearchQuery = {};
            options.searchTerm = activeSearchTerm;
            setSearchTerm(activeSearchTerm);
            fetchData(options);
        }
    }, [activeSearchTerm]);

    useEffect(() => {
        const options: BlogsSearchQuery = {};

        if (activeBlogs.error.isError) {
            setTotalPage(0);
            setLoading(false);
            setNoResult(true);
            setError(true);
        } else if (!activeBlogs.pending) {
            if (location.state && location.state.tagId && !isManagedTag(location.state.tagId, activeManagedTags)) {
                const tag = getBlogsTagById(location.state.tagId, homeBlogsTag);
                dispatch(blogsManagedTagsAdd(tag.guid));
                dispatch(blogsTagsAdd({ displayName: tag.displayName, guid: tag.guid }));
                options.managedTags = [tag.guid];
                fetchData(options);
                navigate(location.pathname, { replace: true });
            } else if (activeBlogs && activeBlogs.totalCount > 0) {
                setBlogs(activeBlogs.data);
                setTotalPage(Math.ceil(activeBlogs.totalCount / (activeUI.limit ? activeUI.limit : 20)));
                setTotalEntries(activeBlogs.totalCount);
                setLoading(false);
                setNoResult(false);
                setError(activeBlogs.error.isError);
            } else if (activeBlogs.totalCount === 0) {
                setLoading(false);
                setNoResult(true);
            } else if (activeBlogs.totalCount === -1) {
                fetchData(options);
            }
        }
    }, [activeBlogs]);

    return (
        <div className="blogs">
            <div className="blogs-header">
                <h2 className="blogs-header-title">{t('BLOGS_TITLE')}</h2>
                <h3 className="blogs-header-description">{t('BLOGS_DESCRIPTION')}</h3>
            </div>
            {activeUI.managedTags && activeUI.managedTags.length !== 0 && (
                <BlogFilters clearAllTags={onClearAllTagFilter} clearTag={onClearTagFilter} />
            )}
            <div className="blogs-result">
                {totalEntries > 0 && !noResult && <div className="blogs-result-number">{totalEntries} results</div>}
            </div>
            <div className="blogs-content">
                {!(loading || error) &&
                    blogs &&
                    blogs.map((blog: BlogsSearchResultContentItem, index: number) => {
                        return <BlogCard key={blog.id} blog={blog} onSelectedTag={onTagSelected} />;
                    })}
            </div>
            {loading && (
                <div className="blogs-loading">
                    <UILoader label={t('BLOGS_LOADING_CONTENT')} labelPosition="bottom" className={'uiLoaderXLarge'} />
                </div>
            )}
            {error && !loading && <WithError />}
            {noResult && !loading && <NoResult />}
            <div className="blogs-pagination">
                {totalPage > maxDisplayPage && (
                    <div>{t('BLOGS_PAGINATION_HEADER', { maxDisplayPage: maxDisplayPage, totalPage: totalPage })}</div>
                )}
                {totalPage > 0 && (
                    <UIPagination
                        nextLabel={t('UI_PAGINATION_CAPTION_NEXT')}
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        pageCount={totalPage > maxDisplayPage ? maxDisplayPage : totalPage}
                        previousLabel={t('UI_PAGINATION_CAPTION_PREVIOUS')}
                        forcePage={pageOffset}
                    />
                )}
            </div>
        </div>
    );
};
