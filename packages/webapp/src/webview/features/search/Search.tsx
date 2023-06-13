import React, { useCallback, useEffect } from 'react';
import type { FC } from 'react';
import { useDispatch } from 'react-redux';

import type { TutorialsUiState, BlogsUiState, BlogFiltersEntry } from '@sap/knowledge-hub-extension-types';
import { PathType } from '@sap/knowledge-hub-extension-types';

import { UISearchBox, UIIconButton } from '@sap-ux/ui-components';
import { useAppSelector } from '../../store';
import { searchTermChanged, tutorialsFiltersSelected, blogsFiltersSelected } from '../../store/actions';
import { getSearchTerm } from './Search.slice';
import { getTutorialsUI, getTutorialsQueryFilters } from '../tutorials/Tutorials.slice';
import { getBlogsUI, getBlogsUIFiltersEntries } from '../blogs/Blogs.slice';

import { searchBlogs } from '../blogs/Blogs.utils';
import { searchTutorials } from '../tutorials/Tutorials.utils';

import './Search.scss';

type SearchProps = {
    type: string;
};

export const Search: FC<SearchProps> = ({ type }: SearchProps): JSX.Element => {
    const dispatch = useDispatch();
    const activeSearch: string = useAppSelector(getSearchTerm);
    const activeQueryTutorialsFilters: string[] | undefined = useAppSelector(getTutorialsQueryFilters);
    const activeQueryBlogsFilters: BlogFiltersEntry[] = useAppSelector(getBlogsUIFiltersEntries);
    const activeTutorialUI: TutorialsUiState = useAppSelector(getTutorialsUI);
    const activeBloglUI: BlogsUiState = useAppSelector(getBlogsUI);

    const [searchTerm, setSearchTerm] = React.useState<string>(activeSearch);

    const onSearch = (searchItem: string): void => {
        dispatch(searchTermChanged(searchItem));
    };

    const onClear = (): void => {
        setSearchTerm('');
        dispatch(searchTermChanged(''));
    };

    const onBlur = (_evt: React.FocusEvent<HTMLInputElement>): void => {
        const searchItem = _evt.target.defaultValue;
        dispatch(searchTermChanged(searchItem));
    };

    const onHandleFilter = useCallback(
        (type: string) =>
            (_event: React.MouseEvent<HTMLButtonElement | HTMLElement | HTMLAnchorElement, MouseEvent>): void => {
                if (type === PathType.TUTORIALS) {
                    dispatch(tutorialsFiltersSelected(!activeTutorialUI.isFiltersMenuOpened));
                }
                if (type === PathType.BLOGS) {
                    dispatch(blogsFiltersSelected(!activeBloglUI.isFiltersMenuOpened));
                }
            },
        [activeTutorialUI, activeBloglUI]
    );

    useEffect(() => {
        if (activeSearch !== searchTerm) {
            setSearchTerm(activeSearch);

            searchBlogs(activeSearch);
            searchTutorials(activeSearch);
        }
    }, [activeSearch]);

    return (
        <div className="search" data-testid="search-component">
            {type === PathType.TUTORIALS && (
                <div className="search-filters">
                    <UIIconButton
                        className={[
                            'search-filters__icon',
                            activeQueryTutorialsFilters && activeQueryTutorialsFilters.length > 0
                                ? 'search-filters__icon-active'
                                : ''
                        ]
                            .filter((x) => !!x)
                            .join(' ')}
                        iconProps={{ iconName: 'Filter' }}
                        onClick={onHandleFilter(type)}
                    />
                    <div className="search-filters__divider" />
                </div>
            )}
            {type === PathType.BLOGS && (
                <div className="search-filters">
                    <UIIconButton
                        className={[
                            'search-filters__icon',
                            activeQueryBlogsFilters && activeQueryBlogsFilters.length > 0
                                ? 'search-filters__icon-active'
                                : ''
                        ]
                            .filter((x) => !!x)
                            .join(' ')}
                        iconProps={{ iconName: 'Filter' }}
                        onClick={onHandleFilter(type)}
                    />
                    <div className="search-filters__divider" />
                </div>
            )}
            <div className="search-box">
                <UISearchBox onSearch={onSearch} onClear={onClear} onBlur={onBlur} defaultValue={searchTerm} />
            </div>
        </div>
    );
};
