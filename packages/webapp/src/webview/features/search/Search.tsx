import React, { useCallback } from 'react';
import type { FC } from 'react';
import { useDispatch } from 'react-redux';

import type { TutorialsUiState, BlogsUiState } from '@sap/knowledge-hub-extension-types';
import { PathType } from '@sap/knowledge-hub-extension-types';

import { UISearchBox, UIIconButton } from '@sap-ux/ui-components';
import { useAppSelector } from '../../store';
import { searchTermChanged, tutorialsFiltersSelected, blogsFiltersSelected } from '../../store/actions';
import { getSearchTerm } from './Search.slice';
import { getTutorialsUI, getTutorialsQueryFilters } from '../tutorials/Tutorials.slice';
import { getBlogsUI } from '../blogs/Blogs.slice';

import './Search.scss';

type SearchProps = {
    type: string;
};

export const Search: FC<SearchProps> = ({ type }: SearchProps): JSX.Element => {
    const dispatch = useDispatch();
    const activeSearch: string = useAppSelector(getSearchTerm);
    const activeQueryFilters: string[] | undefined = useAppSelector(getTutorialsQueryFilters);
    const activeTutorialUI: TutorialsUiState = useAppSelector(getTutorialsUI);
    const activeBloglUI: BlogsUiState = useAppSelector(getBlogsUI);

    const onSearch = useCallback((searchItem: string): void => {
        dispatch(searchTermChanged(searchItem));
    }, []);

    const onClear = useCallback((): void => {
        dispatch(searchTermChanged(''));
    }, []);

    const onBlur = useCallback(
        () =>
            (_evt: React.FocusEvent<HTMLInputElement>): void => {
                const term = _evt.target.defaultValue;
                dispatch(searchTermChanged(term));
            },
        []
    );

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

    return (
        <React.Fragment>
            {type !== PathType.HOME && (
                <div className="search" data-testid="search-component">
                    {(type === PathType.TUTORIALS || type === PathType.BLOGS) && (
                        <div className="search-filters">
                            <UIIconButton
                                className={[
                                    'search-filters__icon',
                                    activeQueryFilters && activeQueryFilters.length > 0
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
                        <UISearchBox
                            onSearch={onSearch}
                            onClear={onClear}
                            onBlur={onBlur}
                            defaultValue={activeSearch}
                        />
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};
