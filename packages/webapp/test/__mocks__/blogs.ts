import { BLOGS_LIMIT_PER_PAGE } from '@sap/knowledge-hub-extension-types';

export const error = {
    isError: true,
    message: 'no internet'
};

export const noError = {
    isError: false,
    message: ''
};

export const tagsWithNoData = [];
export const tagsWithData = [
    { displayName: 'TAG Test', guid: '1' },
    { displayName: 'TAG Test 2', guid: '2' }
];

export const managedTagsWithNoData = [];
export const managedTagsWithData = ['1', '2'];

export const uiEmpty = {
    page: 0,
    limit: BLOGS_LIMIT_PER_PAGE,
    orderBy: 'UPDATE_TIME',
    order: 'DESC',
    contentTypes: ['blogpost'],
    managedTags: [] as string[],
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
    additionalManagedTags: [] as string[],
    additionalUserTags: [] as string[]
};

export const uiWithFilter = {
    page: 0,
    limit: 20,
    orderBy: 'UPDATE_TIME',
    order: 'DESC',
    contentTypes: ['blogpost'],
    managedTags: managedTagsWithData,
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
    additionalManagedTags: [] as string[],
    additionalUserTags: [] as string[]
};

export const blogEntry = [
    {
        id: '1',
        url: 'https://blogs.sap.com/?p=1',
        title: 'Blog title',
        excerpt: '',
        author: { displayName: 'John Doe', username: 'john.doe', active: true },
        type: 'blogpost',
        managedTags: [{ guid: '1', displayName: 'TAG Test' }],
        updated: new Date('2022-10-03T19:36:36'),
        created: new Date('2022-10-03T18:38:26'),
        likeCount: 1,
        voteCount: 1,
        commentCount: 2,
        answerCount: 1,
        followersCount: 1,
        followingsCount: 1,
        description: 'Blog description',
        language: 'English',
        extra: ''
    },
    {
        id: '2',
        url: 'https://blogs.sap.com/?p=1',
        title: 'Blog title 2',
        excerpt: '',
        author: { displayName: 'Jane Doe', username: 'jane.doe', active: true },
        type: 'blogpost',
        managedTags: [{ guid: '1', displayName: 'TAG Test' }],
        updated: new Date('2022-10-03T19:36:36'),
        created: new Date('2022-10-03T18:38:26'),
        likeCount: 1,
        voteCount: 1,
        commentCount: 2,
        answerCount: 1,
        followersCount: 1,
        followingsCount: 1,
        description: 'Blog description 2',
        language: 'English',
        extra: ''
    },
    {
        id: '3',
        url: 'https://blogs.sap.com/?p=1',
        title: 'Blog title 3',
        excerpt: '',
        author: { displayName: 'Jim Doe', username: 'jim.doe', active: true },
        type: 'blogpost',
        managedTags: [{ guid: '1', displayName: 'TAG Test' }],
        updated: new Date('2022-10-03T19:36:36'),
        created: new Date('2022-10-03T18:38:26'),
        likeCount: 1,
        voteCount: 1,
        commentCount: 2,
        answerCount: 1,
        followersCount: 1,
        followingsCount: 1,
        description: 'Blog description 3',
        language: 'English',
        extra: ''
    },
    {
        id: '4',
        url: 'https://blogs.sap.com/?p=1',
        title: 'Blog title 4',
        excerpt: '',
        author: { displayName: 'Joe Doe', username: 'joe.doe', active: true },
        type: 'blogpost',
        managedTags: [{ guid: '1', displayName: 'TAG Test' }],
        updated: new Date('2022-10-03T19:36:36'),
        created: new Date('2022-10-03T18:38:26'),
        likeCount: 1,
        voteCount: 1,
        commentCount: 2,
        answerCount: 1,
        followersCount: 1,
        followingsCount: 1,
        description: 'Blog description 4',
        language: 'English',
        extra: ''
    }
];

export const initial = {
    result: {
        data: [],
        totalCount: -1,
        error: noError,
        pending: false
    },
    ui: uiEmpty,
    tags: []
};

export const initialWithPending = {
    result: {
        data: [],
        totalCount: -1,
        error: noError,
        pending: true
    },
    ui: uiEmpty,
    tags: []
};

export const withNoDataNoError = {
    result: {
        data: [],
        totalCount: 0,
        error: noError,
        pending: false
    },
    ui: uiEmpty,
    tags: []
};

export const withDataNoError = {
    result: {
        data: blogEntry,
        totalCount: 4,
        error: noError,
        pending: false
    },
    ui: uiEmpty,
    tags: []
};

export const withNoDataWithError = {
    result: {
        data: [],
        totalCount: -1,
        error: error,
        pending: false
    },
    ui: uiEmpty,
    tags: []
};

export const withDataWithFilter = {
    result: {
        data: blogEntry,
        totalCount: 4,
        error: noError,
        pending: false
    },
    ui: uiWithFilter,
    tags: tagsWithData
};

export const withDataWithTags = {
    result: {
        data: blogEntry,
        totalCount: 4,
        error: noError,
        pending: false
    },
    ui: uiEmpty,
    tags: tagsWithData
};

export const withDataNoErrorMultiplePage = {
    result: {
        data: blogEntry,
        totalCount: 4,
        error: noError,
        pending: false
    },
    ui: {
        page: 0,
        limit: 2,
        orderBy: 'UPDATE_TIME',
        order: 'DESC',
        contentTypes: ['blogpost'],
        managedTags: [] as string[],
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
        additionalManagedTags: [] as string[],
        additionalUserTags: [] as string[]
    },
    tags: []
};

export const blogsData = {
    contentItems: blogEntry,
    query: uiEmpty,
    totalCount: 4
};
