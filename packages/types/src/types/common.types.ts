export interface Error {
    isError: boolean;
    message: string;
}

export type FetchStatuses = 'init' | 'error' | 'fetched';

export enum ActionTypes {
    Success = 'success',
    Failure = 'failure'
}

export interface FetchResponse<T> {
    status: FetchStatuses;
    data?: T;
    error?: any;
}

export type RequestAction<T> = { type: ActionTypes.Success; payload: T } | { type: ActionTypes.Failure; payload: any };
