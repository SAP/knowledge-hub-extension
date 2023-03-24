export const error = {
    isError: true,
    message: 'no internet'
};

export const noError = {
    isError: false,
    message: ''
};

export const tagsEmpty = {
    tags: {}
};

export const tagsData = {
    tags: {
        'Tag 3': {
            tagAlternativeTitles: [],
            title: 'Test tag',
            tagTitle: 'Test tag'
        },
        'Tag 2': {
            tagAlternativeTitles: [],
            title: 'Group',
            tagTitle: 'tutorial:type/group'
        },
        'Tag 1': {
            tagAlternativeTitles: [],
            title: 'Beginner',
            tagTitle: 'tutorial:experience/beginner'
        }
    }
};

export const tutorialsData = {
    group: '/group',
    mission: '/mission',
    facets: {
        Topic: [],
        Experience: ['Tag 1'],
        Type: ['Tag 2'],
        Software: ['Tag 3']
    },
    iconPath: {},
    tags: {
        'Tag 3': {
            tagAlternativeTitles: [],
            title: 'Test tag',
            tagTitle: 'Test tag'
        },
        'Tag 2': {
            tagAlternativeTitles: [],
            title: 'Group',
            tagTitle: 'tutorial:type/group'
        },
        'Tag 1': {
            tagAlternativeTitles: [],
            title: 'Beginner',
            tagTitle: 'tutorial:experience/beginner'
        }
    },
    tutorialsNewFrom: new Date(new Date().toISOString().split('T')[0]),
    result: [
        {
            creationDate: new Date(new Date().toISOString().split('T')[0]),
            description: 'Test description 1',
            experience: 'Tag 1',
            featured: false,
            featuredOrder: 0,
            icon: 'icon',
            imsId: 12777,
            isRequiredLicense: false,
            itemsType: 'tutorials',
            primaryTag: 'Tag 3',
            publicUrl: '/some-url.html',
            statusTask: 'intact',
            taskProgress: 0,
            taskType: 'Tag 2',
            tasksCount: 4,
            time: '996600',
            title: 'Test title 1'
        },
        {
            creationDate: new Date(new Date().toISOString().split('T')[0]),
            description: 'Test description 2',
            experience: 'Tag 1',
            featured: false,
            featuredOrder: 0,
            icon: 'icon',
            imsId: 12777,
            isRequiredLicense: false,
            itemsType: 'tutorials',
            primaryTag: 'Tag 3',
            publicUrl: '/some-url.html',
            statusTask: 'intact',
            taskProgress: 0,
            taskType: 'Tag 2',
            tasksCount: 4,
            time: '996600',
            title: 'Test title 2'
        },
        {
            creationDate: new Date(new Date().toISOString().split('T')[0]),
            description: 'Test description 3',
            experience: 'Tag 1',
            featured: false,
            featuredOrder: 0,
            icon: 'icon',
            imsId: 12777,
            isRequiredLicense: false,
            itemsType: 'tutorials',
            primaryTag: 'Tag 3',
            publicUrl: '/some-url.html',
            statusTask: 'intact',
            taskProgress: 0,
            taskType: 'Tag 2',
            tasksCount: 4,
            time: '996600',
            title: 'Test title 3'
        },
        {
            creationDate: new Date(new Date().toISOString().split('T')[0]),
            description: 'Test description 4',
            experience: 'Tag 1',
            featured: false,
            featuredOrder: 0,
            icon: 'icon',
            imsId: 12777,
            isRequiredLicense: false,
            itemsType: 'tutorials',
            primaryTag: 'Tag 3',
            publicUrl: '/some-url.html',
            statusTask: 'intact',
            taskProgress: 0,
            taskType: 'Tag 2',
            tasksCount: 4,
            time: '996600',
            title: 'Test title 4'
        }
    ],
    numFound: 4,
    countGroups: 1,
    countMissions: 1,
    countTutorials: 1
};

export const emptyData = {
    group: '',
    mission: '',
    facets: {},
    iconPath: {},
    tags: {},
    tutorialsNewFrom: new Date(new Date().toISOString().split('T')[0]),
    result: [],
    numFound: -1,
    countGroups: 0,
    countMissions: 0,
    countTutorials: 0
};

export const noData = {
    group: '',
    mission: '',
    facets: {},
    iconPath: {},
    tags: {},
    tutorialsNewFrom: new Date(new Date().toISOString().split('T')[0]),
    result: [],
    numFound: 0,
    countGroups: 0,
    countMissions: 0,
    countTutorials: 0
};

export const queryEmpty = {
    rows: 12,
    start: 0,
    searchField: '',
    pagePath: '/content/developers/website/languages/en/tutorial-navigator',
    language: 'en_us',
    addDefaultLanguage: true,
    filters: []
};

export const queryEmptyRows = {
    rows: 2,
    start: 0,
    searchField: '',
    pagePath: '/content/developers/website/languages/en/tutorial-navigator',
    language: 'en_us',
    addDefaultLanguage: true,
    filters: []
};

export const queryEmptyWithFilters = {
    rows: 2,
    start: 0,
    searchField: '',
    pagePath: '/content/developers/website/languages/en/tutorial-navigator',
    language: 'en_us',
    addDefaultLanguage: true,
    filters: ['Tag 1', 'Tag 2', 'Tag 3']
};

const uiInitial = {
    isLoading: false,
    isFiltersMenuOpened: false
};

const uiInitialWithLoading = {
    isLoading: true,
    isFiltersMenuOpened: false
};

export const initial = {
    result: {
        data: emptyData,
        error: noError,
        pending: false
    },
    query: queryEmpty,
    ui: uiInitial,
    tags: tagsEmpty
};

export const initialWithLoading = {
    result: {
        data: emptyData,
        error: noError,
        pending: false
    },
    query: queryEmpty,
    ui: uiInitialWithLoading,
    tags: tagsEmpty
};

export const withDataNoError = {
    result: {
        data: tutorialsData,
        error: noError,
        pending: false
    },
    query: queryEmpty,
    ui: uiInitial,
    tags: tagsData
};

export const withDataNoErrorNoTags = {
    result: {
        data: tutorialsData,
        error: noError,
        pending: false
    },
    query: queryEmpty,
    ui: uiInitial,
    tags: tagsEmpty
};

export const withNoDataNoError = {
    result: {
        data: noData,
        error: noError,
        pending: false
    },
    query: queryEmpty,
    ui: uiInitial,
    tags: tagsEmpty
};

export const withNoDataWithError = {
    result: {
        data: emptyData,
        error: error,
        pending: false
    },
    query: queryEmpty,
    ui: uiInitial,
    tags: tagsEmpty
};

export const withNoDataWithPending = {
    result: {
        data: emptyData,
        error: noError,
        pending: true
    },
    query: queryEmpty,
    ui: uiInitial,
    tags: tagsEmpty
};

export const withDataNoErrorMultiplePage = {
    result: {
        data: tutorialsData,
        error: noError,
        pending: false
    },
    query: queryEmptyRows,
    ui: uiInitial,
    tags: tagsData
};

export const withDataNoErrorWithFilters = {
    result: {
        data: tutorialsData,
        error: noError,
        pending: false
    },
    query: queryEmptyWithFilters,
    ui: uiInitial,
    tags: tagsData
};
