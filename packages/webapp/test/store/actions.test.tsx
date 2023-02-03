import * as actions from '../../src/webview/store/actions';
import * as types from '@sap/knowledge-hub-extension-types';

describe('Page Map redux actions', () => {
    test('Webview is ready action', () => {
        const expectedAction = {
            type: types.KNOWLEDGE_HUB_WEB_VIEW_READY
        };
        const action = actions.knowledgeHubWebViewReady();
        expect(action).toEqual(expectedAction);
    });

    test('Fetch `tutorials` action', () => {
        const options: types.TutorialsSearchQuery = {
            rows: 5,
            start: 2,
            searchField: ''
        };
        const expectedAction = {
            type: types.TUTORIALS_FETCH_TUTORIALS,
            options: options,
            home: false
        };
        const action = actions.tutorialsFetchTutorials(options, false);
        expect(action).toEqual(expectedAction);
    });

    test('Fetch `blogs` action', () => {
        const options: types.BlogsSearchQuery = {
            page: 0,
            limit: 20,
            orderBy: 'UPDATE_TIME',
            order: 'DESC',
            contentTypes: ['blogpost'],
            managedTags: [],
            searchTerm: '',
            questionType: '',
            language: '',
            blogCategories: '',
            authorId: '',
            userTags: '',
            updatedFrom: undefined,
            updatedTo: undefined,
            createdFrom: undefined,
            createdTo: undefined,
            boostingStrategy: '',
            additionalManagedTags: [],
            additionalUserTags: []
        };

        const expectedAction = {
            type: types.BLOGS_FETCH_BLOGS,
            options: options,
            home: false
        };
        const action = actions.blogsFetchBlogs(options, false);
        expect(action).toEqual(expectedAction);
    });
});
