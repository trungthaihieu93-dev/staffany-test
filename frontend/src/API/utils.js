import fetcher, { handleResponse } from './';

export const useGetFetcher = (url) => handleResponse(fetcher(url).get());