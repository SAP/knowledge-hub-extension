import {
    blogsInitialState,
    blogsWithDataNoError,
    blogsInitialWithLoading,
    blogsWithNoDataWithError,
    blogsWithDataWithFilterWithSearch
} from './blogs';
import { tutorialsWithDataNoError, tutorialsInitialWithLoading, tutorialsWithNoDataWithError } from './tutorials';

// Home state

export const homeInitialState = {
    blogs: blogsInitialWithLoading.result,
    tutorials: tutorialsInitialWithLoading.result
};

// TUTORIALS
// Fullfiled
export const stateTutorialsWithDataNoError = {
    blogs: blogsInitialState.result,
    tutorials: tutorialsWithDataNoError.result
};

// Rejected
export const stateTutorialsWithNoDataWithError = {
    blogs: blogsInitialState.result,
    tutorials: tutorialsWithNoDataWithError.result
};

// Pending
export const stateTutorialsWithNoDataWithPending = {
    blogs: blogsInitialState.result,
    tutorials: tutorialsInitialWithLoading.result
};

// BLOGS
// Fullfiled
export const stateBlogsWithDataNoError = {
    blogs: blogsWithDataNoError.result,
    tutorials: tutorialsInitialWithLoading.result
};

export const stateBlogsWithDataNoErrorWithSearch = {
    blogs: blogsWithDataWithFilterWithSearch.result,
    tutorials: tutorialsInitialWithLoading.result
};

// Rejected
export const stateBlogsWithNoDataWithError = {
    blogs: blogsWithNoDataWithError.result,
    tutorials: tutorialsInitialWithLoading.result
};

// Pending
export const stateBlogsWithNoDataWithPending = {
    blogs: blogsInitialWithLoading.result,
    tutorials: tutorialsInitialWithLoading.result
};
