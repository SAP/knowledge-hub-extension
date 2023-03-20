import type { App, TutorialsSearchResult, BlogsSearchResult, TagsSearchResult } from '../types';

export const VIEW_PREFIX = '[view]';
export const CORE_PREFIX = '[core]';

export const PENDING_SUFFIX = '<pending>';
export const FULFILLED_SUFFIX = '<fulfilled>';
export const REJECTED_SUFFIX = '<rejected>';

export interface PayloadAction<T extends string, U> {
    type: T;
    payload: U;
}

export interface PendingAction<T extends string, U> extends PayloadAction<T, U> {
    pending: boolean;
}
export interface ErrorAction<T extends string, U> extends PayloadAction<T, U> {
    error: { message: string };
}

/**
 * Create a matcher function for the payload type.
 *
 * @param type The type of the payload object
 * @returns a match function
 */
function createMatcher<Y>(type: string): (value: any) => value is Y {
    return function match(value: any): value is Y {
        return value.type === type;
    };
}

/**
 * Create a async action function.
 *
 * @param {string} prefix the prefix value of the action
 * @returns a create action function
 */
export function createAsyncActionFactory(prefix: string) {
    return function createAction<T, F = T>(
        name: string
    ): { pending: typeof pending; fulfilled: typeof fulfilled; rejected: typeof rejected } {
        const pendingType = [prefix, name, PENDING_SUFFIX].join(' ');
        /**
         * The pending function definition.
         *
         * @param {boolean} status The status of the pending action
         * @param payload The payload object
         * @returns An pending object
         */
        function pending(status: boolean, payload?: T | undefined): PendingAction<typeof pendingType, T | undefined> {
            return {
                type: pendingType,
                payload,
                pending: status
            };
        }
        pending.type = pendingType;
        pending.match = createMatcher<PayloadAction<typeof pendingType, T>>(pendingType);

        const fulfilledType = [prefix, name, FULFILLED_SUFFIX].join(' ');
        /**
         * The fullfiled function definition.
         *
         * @param payload The payload object
         * @returns A fullfiled object
         */
        function fulfilled(payload: F): PayloadAction<typeof fulfilledType, F> {
            return {
                type: fulfilledType,
                payload
            };
        }
        fulfilled.type = fulfilledType;
        fulfilled.match = createMatcher<PayloadAction<typeof fulfilledType, F>>(fulfilledType);

        const rejectedType = [prefix, name, REJECTED_SUFFIX].join(' ');
        /**
         * The rejected function definition.
         *
         * @param {string} message The rejection message
         * @param payload The payload object
         * @returns A rejected object
         */
        function rejected(message: string, payload?: T | undefined): ErrorAction<typeof rejectedType, T | undefined> {
            return {
                type: rejectedType,
                payload,
                error: { message }
            };
        }
        rejected.type = rejectedType;
        rejected.match = createMatcher<PayloadAction<typeof rejectedType, T>>(rejectedType);

        return {
            pending,
            fulfilled,
            rejected
        };
    };
}

/**
 * Create an action function.
 *
 * @param {string} prefix the prefix value of the action
 * @returns a create action function
 */
export function createActionFactory(prefix: string) {
    return function createAction<T>(name: string): typeof action {
        const actionType = [prefix, name].join(' ');
        /**
         * Action function which return a action object.
         *
         * @param payload The actual payload of the action
         * @returns an action object
         */
        function action(payload: T): { type: string; payload: T } {
            return {
                type: actionType,
                payload
            };
        }

        action.type = actionType;
        action.match = createMatcher<PayloadAction<typeof actionType, T>>(actionType);
        return action;
    };
}

export const createCoreAction = createAsyncActionFactory(CORE_PREFIX);
export const createViewAction = createActionFactory(VIEW_PREFIX);

export const initialize = createCoreAction<App>('app/initialize');
export const fetchTutorials = createCoreAction<TutorialsSearchResult>('tutorials/fetch');
export const fetchBlogs = createCoreAction<BlogsSearchResult>('blogs/fetch');
export const fetchHomeTutorials = createCoreAction<TutorialsSearchResult>('home/tutorials/fetch');
export const fetchHomeBlogs = createCoreAction<BlogsSearchResult>('home/blogs/fetch');
export const fetchTags = createCoreAction<TagsSearchResult>('tags/fetch');
