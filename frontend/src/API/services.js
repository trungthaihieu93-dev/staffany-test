import fetcher, { handleResponse } from './';
import {
  AUTH_ENDPOINT,
  SHIFT_ENDPOINT,
} from './constants';

// Authentication services
export const auth = (authentication) => handleResponse(fetcher(AUTH_ENDPOINT).post(authentication));

// shift services
export const createShift = (data) => handleResponse(fetcher(`${SHIFT_ENDPOINT}`)
  .post(data));

export const updateShift = (id, data) => handleResponse(fetcher(`${SHIFT_ENDPOINT}/${id}`)
  .put(data));

export const deleteShift = (id) => handleResponse(fetcher(`${SHIFT_ENDPOINT}/${id}`)
  .delete());