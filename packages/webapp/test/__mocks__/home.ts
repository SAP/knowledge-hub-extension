import { blogEntry, queryEmpty } from './blogs';
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
    query: queryEmpty,
    totalCount: 0
};

export const blogsWithData = {
    data: blogEntry,
    error: noError,
    pending: false,
    totalCount: 4
};

export const blogsWithLoading = {
    data: [],
    error: noError,
    pending: true,
    totalCount: 0
};

export const blogsInitialsNoPending = {
    data: [],
    error: noError,
    pending: false,
    totalCount: 0
};

export const blogsInitialsWithPending = {
    data: [],
    error: noError,
    pending: true,
    totalCount: 0
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
    data: tutorialsData,
    error: noError,
    pending: false
};

export const tutorialsNoErrorWithPending = {
    data: tutorialsNoData,
    error: noError,
    pending: true
};

export const tutorialsNoErrorNoPending = {
    data: tutorialsNoData,
    error: noError,
    pending: false
};

export const tutorialsWithError = {
    data: tutorialsNoData,
    error: error,
    pending: false
};

export const tutorialsWithLoading = {
    data: tutorialsNoData,
    error: error,
    pending: true
};

export const blogsWithDataNoError = {
    data: [],
    error: noError,
    pending: false,
    totalCount: 0
};

export const blogsNoErrorPending = {
    data: [],
    error: noError,
    pending: true,
    totalCount: 0
};

export const blogsNoDataWithError = {
    data: [],
    error: error,
    pending: false,
    totalCount: 0
};

export const blogsNoDataNoError = {
    error: error,
    pending: true
};

// Home state

export const homeInitialState = {
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
