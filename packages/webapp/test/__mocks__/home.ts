import { blogEntry, uiEmpty } from './blogs';
import { tutorialsData } from './tutorials';

export const error = {
    isError: true,
    message: 'no internet'
};

export const noError = {
    isError: false,
    message: ''
};

export const blogsNoData = {
    contentItems: [],
    query: uiEmpty,
    totalCount: 0
};

export const blogsWithData = {
    blogs: {
        data: blogEntry,
        error: noError,
        pending: false,
        totalCount: 4
    },
    tags: []
};

export const blogsWithLoading = {
    blogs: {
        data: [],
        error: noError,
        pending: true,
        totalCount: 0
    },
    tags: []
};

export const blogsInitialsNoPending = {
    blogs: {
        data: [],
        error: noError,
        pending: false,
        totalCount: 0
    },
    tags: []
};

export const blogsInitialsWithPending = {
    blogs: {
        data: [],
        error: noError,
        pending: true,
        totalCount: 0
    },
    tags: []
};

export const tutorialsNoData = {
    countGroups: 0,
    countMissions: 0,
    countTutorials: 0,
    facets: {},
    group: '',
    iconPath: {},
    mission: '',
    numFound: 0,
    result: [],
    tags: {},
    tutorialsNewFrom: new Date(new Date().toISOString().split('T')[0])
};

export const tutorialsWithData = {
    tutorials: {
        data: tutorialsData,
        error: noError,
        pending: false
    },
    tags: {}
};

export const tutorialsNoErrorWithPending = {
    tutorials: {
        data: tutorialsNoData,
        error: noError,
        pending: true
    },
    tags: {}
};

export const tutorialsNoErrorNoPending = {
    tutorials: {
        data: tutorialsNoData,
        error: noError,
        pending: false
    },
    tags: {}
};

export const tutorialsWithError = {
    tutorials: {
        data: tutorialsNoData,
        error: error,
        pending: false
    },
    tags: {}
};

export const tutorialsWithLoading = {
    tutorials: {
        data: tutorialsNoData,
        error: error,
        pending: true
    },
    tags: {}
};

export const blogsWithDataNoError = {
    blogs: {
        data: [],
        error: noError,
        pending: false,
        totalCount: 0
    },
    tags: []
};

export const blogsNoErrorPending = {
    blogs: {
        data: [],
        error: noError,
        pending: true,
        totalCount: 0
    },
    tags: []
};

export const blogsNoDataWithError = {
    blogs: {
        data: [],
        error: error,
        pending: false,
        totalCount: 0
    },
    tags: []
};

export const blogsNoDataNoError = {
    blogs: {
        error: error,
        pending: true
    },
    tags: []
};

// Home state

export const stateInitial = {
    blogs: blogsInitialsWithPending,
    tutorials: tutorialsNoErrorWithPending
};

// Fullfiled
export const stateTutorialsWithDataNoError = {
    blogs: blogsInitialsWithPending,
    tutorials: tutorialsNoErrorNoPending
};

// Rejected
export const stateTutorialsWithNoDataWithError = {
    blogs: blogsInitialsWithPending,
    tutorials: tutorialsWithError
};

// Pending
export const stateTutorialsWithNoDataWithPending = {
    blogs: blogsInitialsWithPending,
    tutorials: tutorialsNoErrorWithPending
};

// Fullfiled
export const stateBlogsWithDataNoError = {
    blogs: blogsWithDataNoError,
    tutorials: tutorialsNoErrorWithPending
};

// Rejected
export const stateBlogsWithNoDataWithError = {
    blogs: blogsNoDataWithError,
    tutorials: tutorialsNoErrorWithPending
};

// Pending
export const stateBlogsWithNoDataWithPending = {
    blogs: blogsNoErrorPending,
    tutorials: tutorialsNoErrorWithPending
};
