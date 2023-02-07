import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';

import asyncFetch from '../../src/utils/asyncFetch';

jest.mock('axios');
const mockedAxios = axios as jest.MockedFunction<typeof axios>;

describe('fetchData', () => {
    it('fetches successfully data from an API', async () => {
        const result = {
            data: undefined,
            error: undefined,
            status: 'fetched'
        };
        mockedAxios.mockResolvedValueOnce(() => Promise.resolve(result));

        const url = 'http://www.test.com';
        await expect(asyncFetch(url)).resolves.toEqual(result);
    });

    it('fetches erroneously data from an API', async () => {
        const result = {
            data: undefined,
            error: 'error message',
            status: 'error'
        };
        const url = 'http://www.test.com';
        const newAxiosErrorWithStatus = (status: number): AxiosError => {
            const e = new Error() as AxiosError;
            e.response = { status } as AxiosResponse;
            e.message = 'error message';
            e.isAxiosError = true;
            return e;
        };
        mockedAxios.mockRejectedValueOnce(newAxiosErrorWithStatus(404));

        await expect(asyncFetch(url)).resolves.toEqual(result);
    });

    it('fetches data from an API with empty url', async () => {
        const result = {
            data: undefined,
            error: undefined,
            status: 'init'
        };
        mockedAxios.mockRejectedValueOnce(() => Promise.reject(result));

        await expect(asyncFetch('')).resolves.toEqual(result);
    });
});
