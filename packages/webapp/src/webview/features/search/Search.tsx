import React, { useCallback } from 'react';
import type { FC } from 'react';
import { useDispatch } from 'react-redux';

import { PathType } from '@sap/knowledge-hub-extension-types';

import { UISearchBox } from '@sap-ux/ui-components';
import { searchTermChanged } from '../../store/actions';

import './Search.scss';

type SearchProps = {
    type: string;
};

export const Search: FC<SearchProps> = ({ type }: SearchProps): JSX.Element => {
    const dispatch = useDispatch();

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

    return (
        <React.Fragment>
            {type !== PathType.HOME && (
                <div className="search" data-testid="search-component">
                    <UISearchBox onSearch={onSearch} onClear={onClear} onBlur={onBlur} className="search-box" />
                </div>
            )}
        </React.Fragment>
    );
};
