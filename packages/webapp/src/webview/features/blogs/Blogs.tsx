import React, { useState, useEffect, useCallback } from 'react';
import type { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import type {
    BlogsState,
    BlogsSearchQuery,
    BlogsSearchResultContentItem,
    BlogFiltersEntry,
    Tag
} from '@sap/knowledge-hub-extension-types';
import { BlogFiltersEntryType } from '@sap/knowledge-hub-extension-types';

import {
    blogsPageChanged,
    blogsManagedTagsAdd,
    blogsManagedTagsDelete,
    blogsTagsAdd,
    blogsFilterEntryAdd,
    blogsFilterEntryDelete,
    blogsSearchTermChanged
} from '../../store/actions';
import { store, actions, useAppSelector } from '../../store';
import { getBlogs, getBlogsQuery, getManagedTags, getBlogsUIIsLoading } from './Blogs.slice';
import { getTagsData } from '../tags/Tags.slice';
import { isManagedTag, getBlogsTagById } from './blogs.utils';
import { getSearchTerm } from '../search/Search.slice';

import type { UIPaginationSelected } from '../../components/UI/UIPagination';
import { UIPagination } from '../../components/UI/UIPagination';
import { Loader } from '../../components/Loader';
import { NoResult } from '../../components/NoResult';
import { WithError } from '../../components/WithError';
import { BlogCard } from '../../components/BlogCard';
import { BlogsFiltersMenu } from '../../components/BlogsFiltersMenu';
import { BlogsFiltersBar } from '../../components/BlogsFiltersBar';
import { BlogsResultNumber } from '../../components/BlogsResultNumber';

import './Blogs.scss';

export const Blogs: FC = (): JSX.Element => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const maxDisplayPage = 500;

    const activeBlogs: BlogsState = useAppSelector(getBlogs);
    const activeQuery: BlogsSearchQuery = useAppSelector(getBlogsQuery);
    const activeSearchTerm: string = useAppSelector(getSearchTerm);
    const activeManagedTags: string[] = useAppSelector(getManagedTags) || [];
    const activeLoading = useAppSelector(getBlogsUIIsLoading);
    const tags = useAppSelector(getTagsData);

    const [loading, setLoading] = useState(true);
    const [noResult, setNoResult] = useState(true);
    const [error, setError] = useState(false);
    const [blogs, setBlogs] = useState<BlogsSearchResultContentItem[]>();
    const [totalPage, setTotalPage] = useState(0);
    const [totalEntries, setTotalEntries] = useState(0);
    const [pageOffset, setPageOffset] = useState(activeQuery.page);

    /**
     * Fetch blogs data.
     *
     * @param {BlogsSearchQuery} option - blogs search query
     */
    const fetchData = (option: BlogsSearchQuery) => {
        setLoading(true);
        actions.blogsFetchBlogs(option, false);
    };

    const handlePageClick = useCallback((event: UIPaginationSelected) => {
        const options: BlogsSearchQuery = {};
        options.page = event.selected;

        dispatch(blogsPageChanged(event.selected));
        setPageOffset(event.selected);

        fetchData(options);
    }, []);

    const onTagSelected = (tag: Tag, checked: boolean): void => {
        const state = store.getState();
        const currentQuery = state.blogs.query;
        const currentBlogManagedTags: string[] = Object.assign([], currentQuery.managedTags);
        let blogTags: string[] = [];
        const filterEntry: BlogFiltersEntry = {
            id: tag.guid,
            label: tag.displayName,
            type: BlogFiltersEntryType.TAG
        };

        if (checked) {
            if (currentBlogManagedTags.length > 0) {
                if (!currentBlogManagedTags.find((element: string) => element === tag.guid)) {
                    blogTags = currentBlogManagedTags;
                    blogTags.push(tag.guid);
                }
            } else {
                blogTags = [tag.guid];
            }
            dispatch(blogsFilterEntryAdd(filterEntry));
            dispatch(blogsManagedTagsAdd(tag.guid));
        } else {
            blogTags = currentBlogManagedTags.filter((element: string) => element !== tag.guid);
            dispatch(blogsFilterEntryDelete(filterEntry.id));
            dispatch(blogsManagedTagsDelete(tag.guid));
        }
        dispatch(blogsTagsAdd(tag));
        const options: BlogsSearchQuery = Object.assign({}, currentQuery, { managedTags: blogTags });
        fetchData(options);
    };

    useEffect(() => {
        const state = store.getState();
        const currentQuery = state.blogs.query;
        const options: BlogsSearchQuery = Object.assign({}, currentQuery);

        if (activeBlogs.error.isError) {
            setTotalPage(0);
            setLoading(false);
            setNoResult(true);
            setError(true);
        } else if (!activeBlogs.pending) {
            if (location.state && location.state.tagId && !isManagedTag(location.state.tagId, activeManagedTags)) {
                const tag = getBlogsTagById(location.state.tagId, tags);
                const filterEntry: BlogFiltersEntry = {
                    id: tag.guid,
                    label: tag.displayName,
                    type: BlogFiltersEntryType.TAG
                };
                dispatch(blogsFilterEntryAdd(filterEntry));
                dispatch(blogsManagedTagsAdd(tag.guid));
                dispatch(blogsTagsAdd({ displayName: tag.displayName, guid: tag.guid }));
                options.managedTags = [tag.guid];
                fetchData(options);
                navigate(location.pathname, { replace: true });
            } else if (activeBlogs && activeBlogs.totalCount > 0) {
                setBlogs(activeBlogs.data);
                setTotalPage(Math.ceil(activeBlogs.totalCount / (activeQuery.limit ? activeQuery.limit : 20)));
                setTotalEntries(activeBlogs.totalCount);
                setLoading(false);
                setNoResult(false);
                setError(activeBlogs.error.isError);
            } else if (activeBlogs.totalCount === 0) {
                setTotalEntries(activeBlogs.totalCount);
                setLoading(false);
                setNoResult(true);
                setTotalPage(0);
            } else if (activeBlogs.totalCount === -1) {
                setLoading(true);
                fetchData(options);
            }
        }
    }, [activeBlogs]);

    useEffect(() => {
        const state = store.getState();
        const currentQuery = state.blogs.query;
        const options: BlogsSearchQuery = Object.assign({}, currentQuery, { searchTerm: activeSearchTerm });
        dispatch(blogsSearchTermChanged(activeSearchTerm));
        fetchData(options);
    }, [activeSearchTerm]);

    useEffect(() => {
        setLoading(activeLoading);
    }, [activeLoading]);

    return (
        <div className="blogs">
            <div className="blogs-filters">
                <div className="blogs-filters-wrapper">
                    <BlogsFiltersBar />
                    <BlogsFiltersMenu loading={loading} />
                </div>
            </div>

            <div className="blogs-header">
                <h2 className="blogs-header-title">{t('BLOGS_TITLE')}</h2>
                <h3 className="blogs-header-description">{t('BLOGS_DESCRIPTION')}</h3>
            </div>

            <BlogsResultNumber totalNumber={totalEntries} />

            {!(loading || error || noResult) && (
                <div className="blogs-content">
                    <div className="blogs-content-wrapper">
                        {!(loading || error) &&
                            blogs &&
                            blogs.map((blog: BlogsSearchResultContentItem, index: number) => {
                                return <BlogCard key={blog.id} blog={blog} onSelectedTag={onTagSelected} />;
                            })}
                    </div>
                </div>
            )}

            {loading && <Loader label={t('BLOGS_LOADING_CONTENT')} />}
            {error && !loading && <WithError />}
            {noResult && !loading && <NoResult />}

            {totalPage > 1 && (
                <div className="blogs-pagination">
                    {totalPage > maxDisplayPage && (
                        <div>
                            {t('BLOGS_PAGINATION_HEADER', { maxDisplayPage: maxDisplayPage, totalPage: totalPage })}
                        </div>
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
            )}
        </div>
    );
};
