import React, { useState, useCallback, useEffect } from 'react';
import type { FC } from 'react';

import { UISearchBox } from '@sap-ux/ui-components';
import { TutorialsTags, TUTORIALS_FILTERS_LABELS } from '@sap/knowledge-hub-extension-types';

import { store } from '../../../store';
import { isFilteredTag } from '../../../features/tutorials/Tutorials.utils';
import { getAlternativeTitles, getTutorialsTag, makeTutorialsTagCompare } from './TutorialFiltersMenuEntries.utils';
import type { SortedTagListEntry } from './TutorialFiltersMenuEntries.utils';

import { Loader } from '../../../components/Loader';

import './TutorialFiltersMenuEntries.scss';

export type TutorialFiltersMenuEntriesProps = {
    title: string;
    entries: string[];
    tags: TutorialsTags;
    withSearchOn: boolean;
    isSmall: boolean;
    onSelectedTag(tag: string): void;
};

export const TutorialFiltersMenuEntries: FC<TutorialFiltersMenuEntriesProps> = ({
    title,
    entries,
    tags,
    withSearchOn,
    isSmall,
    onSelectedTag
}): JSX.Element => {
    const [listEntries, setListEntries] = useState(entries);
    const [loading, setLoading] = useState(false);

    const handleTagIdClick = useCallback(
        (tagId: string) =>
            (_event: React.MouseEvent<HTMLButtonElement | HTMLElement | HTMLAnchorElement, MouseEvent>) => {
                const state = store.getState();
                const tagFilters = Object.assign([], state.tutorials.query.filters);
                if (!isFilteredTag(tagId, tagFilters)) {
                    setLoading(true);
                    onSelectedTag(tagId);
                }
            },
        []
    );

    const onSearch = useCallback((searchItem: string): void => {
        const filteredEntries = entries.filter((entry) => {
            const entryTitle = getTutorialsTag(entry, tags);
            return entryTitle.toUpperCase().includes(searchItem.toUpperCase());
        });
        setListEntries(filteredEntries);
    }, []);

    const onChange = useCallback(
        (_event: React.ChangeEvent<HTMLInputElement> | undefined, searchItem: string | undefined) => {
            if (searchItem) {
                const filteredEntries = entries.filter((entry) => {
                    const entryTitle = getTutorialsTag(entry, tags);
                    const alternativeTitles = getAlternativeTitles(entry, tags);

                    return (
                        entryTitle.toUpperCase().includes(searchItem.toUpperCase()) ||
                        alternativeTitles?.some((element: string) =>
                            element.toUpperCase().includes(searchItem.toUpperCase())
                        )
                    );
                });
                setListEntries(filteredEntries);
            } else {
                setListEntries(entries);
            }
        },
        []
    );

    const onClear = useCallback((): void => {
        setListEntries(entries);
    }, []);

    const getListEntry = (listEntries: string[], tags: TutorialsTags, listTitle: string): JSX.Element | null => {
        const sortedList: SortedTagListEntry[] = [];
        listEntries.forEach((entry, index) => {
            const title = getTutorialsTag(entry, tags);
            if (title && title !== '') {
                sortedList.push({ title: title, tagId: entry });
            }
        });

        let comparer = makeTutorialsTagCompare('abcdefghijklmnopqrstuvwxyz');

        if (listTitle === TUTORIALS_FILTERS_LABELS.Experience) {
            // if title is 'Experience' then sort if by 'beginner', 'intermediate', 'advanced'
            comparer = makeTutorialsTagCompare('bia');
        } else if (listTitle === TUTORIALS_FILTERS_LABELS.Type) {
            // if title is 'Type' then sort if by 'Misson', 'Group', 'Tutorial'
            comparer = makeTutorialsTagCompare('mgt');
        }
        sortedList.sort(comparer);

        return (
            <React.Fragment>
                {sortedList.map((entry: SortedTagListEntry) => {
                    return (
                        <li className="tutorial-filters-menu-entries__content-list-entry" key={entry.tagId}>
                            <div className="ui-medium-text" onClick={handleTagIdClick(entry.tagId)}>
                                {entry.title}
                            </div>
                        </li>
                    );
                })}
            </React.Fragment>
        );
    };

    useEffect(() => {
        setLoading(false);
    }, [entries]);

    return (
        <div
            className={[
                'tutorial-filters-menu-entries',
                isSmall ? 'tutorial-filters-menu-entries__small' : 'tutorial-filters-menu-entries__normal'
            ]
                .filter((x) => !!x)
                .join(' ')}>
            {loading && <Loader blockDOM={true} delayed={true} />}

            <div className="tutorial-filters-menu-entries__header">
                <span className="tutorial-filters-menu-entries__header-title">{title}</span>
            </div>
            {withSearchOn && (
                <div className="tutorial-filters-menu-entries__search">
                    <UISearchBox
                        onChange={onChange}
                        onSearch={onSearch}
                        onClear={onClear}
                        className="tutorial-filters-menu-entries__search__box"
                    />
                </div>
            )}
            {listEntries.length > 0 && (
                <React.Fragment>
                    <div className="tutorial-filters-menu-entries__content">
                        <ul
                            className="tutorial-filters-menu-entries__content-list"
                            data-testid="tutorial-filters-menu-entries__content-list">
                            {getListEntry(listEntries, tags, title)}
                        </ul>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};
