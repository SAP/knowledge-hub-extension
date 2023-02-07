import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

export type ResponseStatuses = 'init' | 'error' | 'fetched';

export enum ActionTypes {
    Success = 'success',
    Failure = 'failure'
}

export interface ResponseState<T> {
    status: ResponseStatuses;
    data?: T;
    error?: any;
}

export type RequestAction<T> = { type: ActionTypes.Success; payload: T } | { type: ActionTypes.Failure; payload: any };

/**
 * Handles the async fetch.
 *
 * @param url - request URL
 * @param options - request opcions
 * @returns {Promise<ResponseState>} - Promise to response
 */
async function asyncFetch<T>(url: string, options?: AxiosRequestConfig): Promise<ResponseState<T>> {
    const initialState: ResponseState<T> = {
        status: 'init',
        error: undefined,
        data: undefined
    };

    if (!url) {
        return initialState;
    }

    const statusMap = (action: RequestAction<T>): ResponseState<T> => {
        if (action.type === ActionTypes.Success) {
            return { ...initialState, status: 'fetched', data: action.payload };
        } else {
            return { ...initialState, status: 'error', error: action.payload };
        }
    };

    let state = initialState;

    const fetchData = async () => {
        try {
            const response = await axios(url, options);
            state = statusMap({ type: ActionTypes.Success, payload: response.data });
        } catch (error: any) {
            state = statusMap({
                type: ActionTypes.Failure,
                payload: error.message
            });
        }
    };

    await fetchData();
    return state;
}

export default asyncFetch;
