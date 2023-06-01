import { BLOGS_LIMIT_PER_PAGE, BlogFiltersEntryType } from '@sap/knowledge-hub-extension-types';

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
    { displayName: 'tag 1', guid: '1' },
    { displayName: 'tag 2', guid: '2' },
    { displayName: 'tag 3', guid: '3' },
    { displayName: 'tag 4', guid: '4' },
    { displayName: 'tag 5', guid: '5' }
];

export const managedTagsWithNoData = [];
export const managedTagsWithData = ['1', '2'];

export const filtersWithData = [
    { id: '1', label: 'tag 1', type: BlogFiltersEntryType.TAG },
    { id: '2', label: 'tag 2', type: BlogFiltersEntryType.TAG },
    { id: 'b6e6296c-7cf2-4fe6-aa91-d77078aad028', label: 'category 1', type: BlogFiltersEntryType.CATEGORY },
    { id: '99', label: 'language 1', type: BlogFiltersEntryType.LANGUAGE }
];

export const queryEmpty = {
    page: 0,
    limit: BLOGS_LIMIT_PER_PAGE,
    orderBy: 'UPDATE_TIME',
    order: 'DESC',
    contentTypes: ['blogpost'],
    managedTags: [] as string[],
    searchTerm: '',
    questionType: '',
    language: '',
    blogCategories: [] as string[],
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

export const queryWithFilter = {
    page: 0,
    limit: 20,
    orderBy: 'UPDATE_TIME',
    order: 'DESC',
    contentTypes: ['blogpost'],
    managedTags: ['2'],
    searchTerm: '',
    questionType: '',
    language: '4',
    blogCategories: ['b6e6296c-7cf2-4fe6-aa91-d77078aad028'],
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

export const queryWithSearchTerm = {
    page: 0,
    limit: 20,
    orderBy: 'RELEVANCE',
    order: 'DESC',
    contentTypes: ['blogpost'],
    managedTags: ['2'],
    searchTerm: 'test',
    questionType: '',
    language: '4',
    blogCategories: ['b6e6296c-7cf2-4fe6-aa91-d77078aad028'],
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
        updated: new Date(new Date().toISOString().split('T')[0]),
        created: new Date(new Date().toISOString().split('T')[0]),
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
        updated: new Date(new Date().toISOString().split('T')[0]),
        created: new Date(new Date().toISOString().split('T')[0]),
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
        updated: new Date(new Date().toISOString().split('T')[0]),
        created: new Date(new Date().toISOString().split('T')[0]),
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
        updated: new Date(new Date().toISOString().split('T')[0]),
        created: new Date(new Date().toISOString().split('T')[0]),
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

export const uiEmpty = {
    isLoading: true,
    isFiltersMenuOpened: false,
    filtersEntries: []
};

export const uiNoFiltersNoLoading = {
    isLoading: false,
    isFiltersMenuOpened: false,
    filtersEntries: []
};

export const uiNoFiltersNoLoadingMenuOpened = {
    isLoading: false,
    isFiltersMenuOpened: true,
    filtersEntries: []
};

export const uiWithFilters = {
    isLoading: false,
    isFiltersMenuOpened: true,
    filtersEntries: filtersWithData
};

export const blogsInitialState = {
    result: {
        data: [],
        totalCount: -1,
        error: noError,
        pending: false
    },
    query: queryEmpty,
    ui: uiNoFiltersNoLoading
};

export const initialWithLoading = {
    result: {
        data: [],
        totalCount: -1,
        error: noError,
        pending: false
    },
    query: queryEmpty,
    ui: uiEmpty
};

export const initialWithPending = {
    result: {
        data: [],
        totalCount: -1,
        error: noError,
        pending: true
    },
    query: queryEmpty,
    ui: uiNoFiltersNoLoading
};

export const withNoDataNoError = {
    result: {
        data: [],
        totalCount: 0,
        error: noError,
        pending: false
    },
    query: queryEmpty,
    ui: uiNoFiltersNoLoading
};

export const withDataNoError = {
    result: {
        data: blogEntry,
        totalCount: 4,
        error: noError,
        pending: false
    },
    query: queryEmpty,
    ui: uiNoFiltersNoLoading
};

export const withDataNoErrorMenuOpened = {
    result: {
        data: blogEntry,
        totalCount: 4,
        error: noError,
        pending: false
    },
    query: queryEmpty,
    ui: uiNoFiltersNoLoadingMenuOpened
};

export const withNoDataWithError = {
    result: {
        data: [],
        totalCount: -1,
        error: error,
        pending: false
    },
    query: queryEmpty,
    ui: uiNoFiltersNoLoading
};

export const withDataWithFilter = {
    result: {
        data: blogEntry,
        totalCount: 4,
        error: noError,
        pending: false
    },
    query: queryWithFilter,
    ui: uiWithFilters
};

export const withDataWithTags = {
    result: {
        data: blogEntry,
        totalCount: 4,
        error: noError,
        pending: false
    },
    query: queryWithFilter,
    ui: uiWithFilters
};

export const withDataNoErrorMultiplePage = {
    result: {
        data: blogEntry,
        totalCount: 4,
        error: noError,
        pending: false
    },
    query: {
        page: 0,
        limit: 2,
        orderBy: 'UPDATE_TIME',
        order: 'DESC',
        contentTypes: ['blogpost'],
        managedTags: [] as string[],
        searchTerm: '',
        questionType: '',
        language: '',
        blogCategories: [],
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
    ui: uiEmpty
};

export const blogsData = {
    contentItems: blogEntry,
    query: queryEmpty,
    totalCount: 4
};
