import { getTutorialsTag } from '../../../src/webview/features/tutorials/Tutorials.utils';
import { tutorialsEmptyData } from '../../__mocks__/tutorials';

describe('Tutorials.utils', () => {
    it('should test `getTutorialsTag`', () => {
        const res = getTutorialsTag('tag1', tutorialsEmptyData);
        expect(res).toBe('');
    });

    it('should test `getTutorialsTag`', () => {
        const tags = {
            tag1: {
                tagAlternativeTitles: [''],
                tagTitle: 'tag1title',
                title: 'title'
            }
        };
        const facets = {
            facet1: ['']
        };

        const iconPath = {
            icon1: ['']
        };

        const allTutorials = {
            group: '',
            mission: '',
            facets: facets,
            iconPath: iconPath,
            tags: tags,
            tutorialsNewFrom: new Date(new Date().toISOString().split('T')[0]),
            result: [],
            numFound: 0,
            countGroups: 0,
            countMissions: 0,
            countTutorials: 0
        };

        const res = getTutorialsTag('tag1', allTutorials);

        expect(res).toBe('title');
    });
});
