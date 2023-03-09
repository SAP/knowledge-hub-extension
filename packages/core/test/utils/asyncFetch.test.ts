import axios from 'axios';
import type { AxiosError, AxiosResponse } from 'axios';

import asyncFetch from '../../src/utils/asyncFetch';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchData', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('fetches successfully data from an API', async () => {
        const data = {
            data: undefined,
            error: undefined,
            status: 'fetched'
        };
        let requestUrl = '';
        mockedAxios.get.mockImplementation((url) => {
            requestUrl = url;
            return Promise.resolve({ data });
        });

        const url = 'http://www.test.com';
        const result = await asyncFetch(url);

        expect(requestUrl).toBe(url);

        await expect(result).toEqual({
            data: data,
            error: undefined,
            status: 'fetched'
        });
    });

    it('fetches erroneously data from an API', async () => {
        const data = {
            data: undefined,
            error: 'error message',
            status: 'error'
        };

        let requestUrl = '';
        mockedAxios.get.mockImplementation((url) => {
            requestUrl = url;
            return Promise.reject({ data });
        });

        const url = 'http://www.test.com';
        const result = await asyncFetch(url);

        await expect(result).toEqual({
            data: undefined,
            error: undefined,
            status: 'error'
        });
    });
});
