export const error = {
    isError: true,
    message: 'no internet'
};

export const noError = {
    isError: false,
    message: ''
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
    tutorialsNewFrom: 'Fri, 3 Sep 2021 11:43 AM',
    result: [
        {
            creationDate: 'Nov 29, 2020 6:51:00 AM',
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
            creationDate: 'Nov 29, 2020 6:51:00 AM',
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
            creationDate: 'Nov 29, 2020 6:51:00 AM',
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
            creationDate: 'Nov 29, 2020 6:51:00 AM',
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
    tutorialsNewFrom: '',
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
    tutorialsNewFrom: '',
    result: [],
    numFound: 0,
    countGroups: 0,
    countMissions: 0,
    countTutorials: 0
};

export const uiEmpty = {
    rows: 18,
    start: 0,
    searchField: '',
    pagePath: '/content/developers/website/languages/en/tutorial-navigator',
    language: 'en_us',
    addDefaultLanguage: true,
    filters: []
};

export const uiEmptyRows = {
    rows: 2,
    start: 0,
    searchField: '',
    pagePath: '/content/developers/website/languages/en/tutorial-navigator',
    language: 'en_us',
    addDefaultLanguage: true,
    filters: []
};

export const uiEmptyWithFilters = {
    rows: 2,
    start: 0,
    searchField: '',
    pagePath: '/content/developers/website/languages/en/tutorial-navigator',
    language: 'en_us',
    addDefaultLanguage: true,
    filters: ['Tag 1', 'Tag 2', 'Tag 3']
};

export const initial = {
    result: {
        data: emptyData,
        error: noError,
        pending: false
    },
    ui: uiEmpty
};

export const withDataNoError = {
    result: {
        data: tutorialsData,
        error: noError,
        pending: false
    },
    ui: uiEmpty
};

export const withNoDataNoError = {
    result: {
        data: noData,
        error: noError,
        pending: false
    },
    ui: uiEmpty
};

export const withNoDataWithError = {
    result: {
        data: emptyData,
        error: error,
        pending: false
    },
    ui: uiEmpty
};

export const withNoDataWithPending = {
    result: {
        data: emptyData,
        error: noError,
        pending: true
    },
    ui: uiEmpty
};

export const withDataNoErrorMultiplePage = {
    result: {
        data: tutorialsData,
        error: noError,
        pending: false
    },
    ui: uiEmptyRows
};

export const withDataNoErrorWithFilters = {
    result: {
        data: tutorialsData,
        error: noError,
        pending: false
    },
    ui: uiEmptyWithFilters
};
