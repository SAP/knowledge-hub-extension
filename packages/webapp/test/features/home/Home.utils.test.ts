import { fecthHomeBlogs, fecthHomeTutorials } from '../../../src/webview/features/home/home.utils';
import { actions } from '../../../src/webview/store';

describe('Home.utils', () => {
    it('should test `fecthHomeBlogs`', () => {
        const spyblogsFetchBlogs = jest.spyOn(actions, 'blogsFetchBlogs');
        fecthHomeBlogs();
        expect(spyblogsFetchBlogs).toBeCalledTimes(1);
    });

    it('should test `fecthHomeTutorials`', () => {
        const spytutorialsFetchTutorials = jest.spyOn(actions, 'tutorialsFetchTutorials');
        fecthHomeTutorials();
        expect(spytutorialsFetchTutorials).toBeCalledTimes(1);
    });
});
