import React, { useCallback } from 'react';
import type { FC } from 'react';
import { useDispatch } from 'react-redux';

import type { TutorialsUiState } from '@sap/knowledge-hub-extension-types';
import { PathType } from '@sap/knowledge-hub-extension-types';

import { UISearchBox, UIIconButton } from '@sap-ux/ui-components';
import { useAppSelector } from '../../store';
import { searchTermChanged, tutorialsFiltersSelected } from '../../store/actions';
import { getTutorialsUI, getTutorialsQueryFilters } from '../tutorials/Tutorials.slice';

import './Search.scss';

type SearchProps = {
    type: string;
};

export const Search: FC<SearchProps> = ({ type }: SearchProps): JSX.Element => {
    const activeQueryFilters: string[] | undefined = useAppSelector(getTutorialsQueryFilters);
    const dispatch = useDispatch();

    const activeTutorialUI: TutorialsUiState = useAppSelector(getTutorialsUI);

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

    const onHandleFilter = useCallback(() => {
        dispatch(tutorialsFiltersSelected(!activeTutorialUI.isFiltersMenuOpened));
    }, [activeTutorialUI]);

    return (
        <React.Fragment>
            {type !== PathType.HOME && (
                <div className="search" data-testid="search-component">
                    {type === PathType.TUTORIALS && (
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
                                onClick={onHandleFilter}
                            />
                            <div className="search-filters__divider" />
                        </div>
                    )}
                    <div className="search-box">
                        <UISearchBox onSearch={onSearch} onClear={onClear} onBlur={onBlur} />
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};
