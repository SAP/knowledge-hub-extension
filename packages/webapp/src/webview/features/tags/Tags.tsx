import React, { useState, useRef, useCallback, useEffect } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import {
    UIActionButton,
    UILink,
    UIIcon,
    UIIconButton,
    UIDefaultButton,
    UISearchBox,
    UISeparator
} from '@sap-ux/ui-components';

import type { Tag, SortedAlphaTags } from '@sap/knowledge-hub-extension-types';
import { MOTION_VARIANTS_PAGE } from '../../constants';

import { useAppSelector } from '../../store';
import { getTagsData } from './Tags.slice';
import { getTagsAlphaRef } from './Tags.utils';

import './Tags.scss';

export const Tags: FC = (): JSX.Element => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const tags: Tag[] = useAppSelector(getTagsData);
    const navAlphaTopRef = useRef<null | HTMLDivElement>(null);
    const [listTags, setListTags] = useState(tags);
    const tagAlphaWithRef = getTagsAlphaRef();

    const backToBlogs = (): void => {
        navigate('/blogs');
    };

    const goToTop = (): void => {
        if (navAlphaTopRef?.current) {
            navAlphaTopRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const goToAlpha = (ref: React.MutableRefObject<HTMLDivElement | null>) => (): void => {
        if (ref?.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const getRefForKey = (key: string): React.MutableRefObject<HTMLDivElement | null> => {
        const alphaRef = tagAlphaWithRef.find((alpha) => alpha.value === key);
        if (alphaRef) {
            return alphaRef.ref;
        }
        return { current: null };
    };

    const onBlogTagSelected = useCallback(
        (tag: Tag) => (_: any) => {
            navigate('/blogs', { state: { tagId: tag.guid } });
        },
        []
    );

    const sortTags = (tags: Tag[]): SortedAlphaTags => {
        const sortedTags = tags.slice().sort((a, b) => a.displayName.localeCompare(b.displayName));
        const object: SortedAlphaTags = {};

        for (const tag of sortedTags) {
            const firstLetter = tag.displayName[0].toUpperCase();
            if (!object[firstLetter]) {
                object[firstLetter] = [];
            }
            object[firstLetter].push(tag);
        }

        return object;
    };

    const getListTag = (sortedTags: SortedAlphaTags): JSX.Element | null => {
        return (
            <React.Fragment>
                {Object.keys(sortedTags).map((key) => (
                    <div className="tags-content-wrapper__item" key={key} data-testid={`${key}-wrapper`}>
                        <div className="tags-content-wrapper__item-title" ref={getRefForKey(key)}>
                            <h3 className="tags-content-wrapper__item-title-txt">{key}</h3>
                            <UIIconButton
                                data-testid={`${key}-btn-top`}
                                className="tags-content-wrapper__item-title-btn-top"
                                iconProps={{ iconName: 'ToTheTop' }}
                                onClick={goToTop}
                            />
                        </div>
                        <ul className="tags-content-wrapper__item-list">
                            {sortedTags[key].map((tag: Tag) => (
                                <li className="tags-content-wrapper__item-list-item" key={tag.guid}>
                                    <UIActionButton
                                        onClick={onBlogTagSelected(tag)}
                                        className="tags-content-wrapper__item-list-item__btn">
                                        {tag.displayName}
                                    </UIActionButton>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </React.Fragment>
        );
    };

    const onChange = useCallback(
        (_event: React.ChangeEvent<HTMLInputElement> | undefined, searchItem: string | undefined) => {
            if (searchItem) {
                const filteredTags = tags.filter((tag) => {
                    return tag.displayName.toUpperCase().includes(searchItem.toUpperCase());
                });
                setListTags(filteredTags);
            } else {
                setListTags(tags);
            }
        },
        []
    );

    const onClear = useCallback((): void => {
        setListTags(tags);
    }, []);

    useEffect(() => {
        setListTags(tags);
    }, [tags]);

    return (
        <motion.div
            className="tags"
            custom={{ direction: 'forward' }}
            initial="initial"
            animate="getIn"
            exit="getOut"
            variants={MOTION_VARIANTS_PAGE}>
            <div className="tags-back">
                <UILink
                    className="tags-back-link"
                    title={t('TAGS_BACK_TO_BLOGS')}
                    href="#"
                    onClick={backToBlogs}
                    onKeyDown={backToBlogs}>
                    <UIIcon iconName="ArrowLeft" className="tags-back-link__icn" /> {t('TAGS_BACK_TO_BLOGS')}
                </UILink>
            </div>

            <div className="tags-header">
                <h2 className="ui-large-header tags-header-title">{t('TAGS_TITLE')}</h2>
            </div>

            <div className="tags-search">
                <div className="tags-search__nav" ref={navAlphaTopRef}>
                    <ul className="tags-search__nav-list">
                        {tagAlphaWithRef.map((alpha) => (
                            <li className="tags-search__nav-list-entry" role="presentation" key={alpha.label}>
                                <UIDefaultButton onClick={goToAlpha(alpha.ref)} data-testid={alpha.label}>
                                    {alpha.label}
                                </UIDefaultButton>
                            </li>
                        ))}
                    </ul>
                </div>
                <UISeparator vertical />
                <div className="tags-search__search">
                    <UISearchBox
                        iconProps={{ iconName: 'Filter' }}
                        placeholder={t('TAGS_SEARCH_PLACEHOLDER')}
                        onChange={onChange}
                        onClear={onClear}
                        className="tags-search__search-box"
                    />
                </div>
            </div>

            <div className="tags-content">
                <div className="tags-content-wrapper">{getListTag(sortTags(listTags))}</div>
            </div>
        </motion.div>
    );
};
