import React, { useState, useCallback, useEffect } from 'react';
import type { FC } from 'react';

import { UICheckbox, UISearchBox } from '@sap-ux/ui-components';

import { TutorialsTags, TUTORIALS_FILTERS_LABELS } from '@sap/knowledge-hub-extension-types';

import { store } from '../../../store';
import { isFilteredTag } from '../../../features/tutorials/Tutorials.utils';
import { getAlternativeTitles, getTutorialsTag, makeTutorialsTagCompare } from './TutorialsFiltersMenuEntries.utils';
import type { SortedTagListEntry } from './TutorialsFiltersMenuEntries.utils';

import { Loader } from '../../Loader';

import './TutorialsFiltersMenuEntries.scss';

export type TutorialsFiltersMenuEntriesProps = {
    title: string;
    entries: string[];
    tags: TutorialsTags;
    withSearchOn: boolean;
    isSmall: boolean;
    onSelectedTag(tag: string): void;
    onClearedTag(tag: string): void;
};

export const TutorialsFiltersMenuEntries: FC<TutorialsFiltersMenuEntriesProps> = ({
    title,
    entries,
    tags,
    withSearchOn,
    isSmall,
    onSelectedTag,
    onClearedTag
}): JSX.Element => {
    const [listEntries, setListEntries] = useState(entries);
    const [loading, setLoading] = useState(false);

    const isTagChecked = useCallback((tagId: string): boolean => {
        const state = store.getState();
        const tagFilters = Object.assign([], state.tutorials.query.filters);
        return tagFilters.includes(tagId);
    }, []);

    const onTagSelected = (tagId: string, checked: boolean): void => {
        const state = store.getState();
        const tagFilters = Object.assign([], state.tutorials.query.filters);
        if (checked) {
            if (!isFilteredTag(tagId, tagFilters)) {
                setLoading(true);
                onSelectedTag(tagId);
            }
        } else if (isFilteredTag(tagId, tagFilters)) {
            setLoading(true);
            onClearedTag(tagId);
        }
    };

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
                        <li className="tutorials-filters-menu-entries__content-list-entry" key={entry.tagId}>
                            <UICheckbox
                                label={entry.title}
                                checked={isTagChecked(entry.tagId)}
                                onChange={(_event, checked?: boolean) => {
                                    onTagSelected(entry.tagId, !!checked);
                                }}
                            />
                        </li>
                    );
                })}
            </React.Fragment>
        );
    };

    useEffect(() => {
        setLoading(false);
        setListEntries(entries);
    }, [entries]);

    return (
        <div
            className={[
                'tutorials-filters-menu-entries',
                isSmall ? 'tutorials-filters-menu-entries__small' : 'tutorials-filters-menu-entries__normal'
            ]
                .filter((x) => !!x)
                .join(' ')}>
            {loading && <Loader blockDOM={true} delayed={true} />}

            <div className="tutorials-filters-menu-entries__header">
                <span className="tutorials-filters-menu-entries__header-title">{title}</span>
            </div>
            {withSearchOn && (
                <div className="tutorials-filters-menu-entries__search">
                    <UISearchBox
                        onChange={onChange}
                        onClear={onClear}
                        className="tutorials-filters-menu-entries__search__box"
                    />
                </div>
            )}
            {listEntries.length > 0 && (
                <React.Fragment>
                    <div className="tutorials-filters-menu-entries__content">
                        <ul
                            className="tutorials-filters-menu-entries__content-list"
                            data-testid="tutorials-filters-menu-entries__content-list">
                            {getListEntry(listEntries, tags, title)}
                        </ul>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};
