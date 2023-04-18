import React, { useCallback } from 'react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { UILoader, UIPersona, UIPersonaSize } from '@sap-ux/ui-components';
import type { TutorialsEntry, TutorialsTags } from '@sap/knowledge-hub-extension-types';

import { TaskType } from './TaskType';
import { Experience } from './Experience';
import { Duration } from './Duration';
import { Featured } from './Featured';
import { TagsTutorial } from './TagsTutorial';

import './TutorialCard.scss';
import { actions } from '../../store';

type TutorialCardProps = {
    tutorial?: TutorialsEntry;
    tag?: string;
    tags?: TutorialsTags;
    loading?: boolean;
    onSelectedTag(tag: string, isChecked: boolean): void;
    callback?(desc: string, primaryTag: string): void;
};

export const TutorialCard: FC<TutorialCardProps> = ({
    tutorial,
    tag,
    tags,
    loading,
    onSelectedTag,
    callback
}: TutorialCardProps): JSX.Element => {
    const { t } = useTranslation();

    const onClickedTag = useCallback((tag: string) => {
        onSelectedTag(tag, true);
    }, []);
    const onClickTutorialCard = useCallback(
        (title: string, primaryTag: string) =>
            (_event: React.MouseEvent<HTMLButtonElement | HTMLElement | HTMLAnchorElement, MouseEvent>) => {
                actions.sendTutorialDataToTelemetry(title, primaryTag);
            },
        []
    );
    const getFullNameForTag = (tag: string): string => {
        if (tags && tags[tag]) {
            return tags[tag].title;
        } else {
            return '';
        }
    };
    return (
        <div className="tutorial-card">
            {!loading && tutorial && tag && (
                <a
                    href={`https://developers.sap.com${tutorial.publicUrl}`}
                    onClick={onClickTutorialCard(tutorial.title, tutorial.primaryTag)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tutorial-card-link">
                    <div className="tutorial-card-header">
                        <div className="tutorial-card-header-icon">
                            <UIPersona
                                imageUrl={`https://developers.sap.com${tutorial.icon}`}
                                size={UIPersonaSize.size32}
                            />
                        </div>
                        <div className="tutorial-card-header-info">
                            <div className="tutorial-card-header-info-task-type">
                                <TaskType type={getFullNameForTag(tutorial.taskType)} />
                            </div>
                            <div className="tutorial-card-header-info-experience">
                                <Experience experience={getFullNameForTag(tutorial.experience)} />
                            </div>
                            <div className="tutorial-card-header-info-time">
                                <Duration duration={tutorial.time} />
                            </div>
                        </div>
                    </div>
                    <h3 className="tutorial-card-title">{tutorial.title}</h3>
                    <h4 className="tutorial-card-description">{tutorial.description}</h4>
                    <div className="tutorial-card-footer">
                        <TagsTutorial
                            tagText={tag}
                            tagId={tutorial.primaryTag}
                            isFeatured={tutorial.featured}
                            callback={onClickedTag}
                        />
                        {tutorial.featured && <Featured />}
                    </div>
                </a>
            )}
            {loading && (
                <div className="tutorial-card-loading">
                    <UILoader
                        label={t('TUTORIALS_LOADING_CONTENT')}
                        labelPosition="bottom"
                        className={'uiLoaderXLarge'}
                    />
                </div>
            )}
        </div>
    );
};
