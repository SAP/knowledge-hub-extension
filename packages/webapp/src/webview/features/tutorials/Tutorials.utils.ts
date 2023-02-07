import type { TutorialsSearchResult } from '@sap/knowledge-hub-extension-types';

export const getTutorialsTag = (val: string, allTutorials: TutorialsSearchResult | undefined): string => {
    if (allTutorials && allTutorials.tags && allTutorials.tags[val]) {
        return allTutorials.tags[val].title;
    } else {
        return '';
    }
};
