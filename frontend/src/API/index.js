import { JWT } from 'constants/env';

export const handleResponse = async (fetchingResponse) => {
  const response = await fetchingResponse;

  if (!response.ok) {
    const { statusCode, error, message } = await response.json();

    const thrownErr = new Error();
    thrownErr.message = message;
    thrownErr.status = statusCode;
    throw thrownErr;
  }

  return response.json();
};

class Fetcher {
  constructor(url, options) {
    this.headers = this.buildHeaders(options);
    this.url = url;
  }

  // Build headers
  buildHeaders = (options) => {
    const token = window.localStorage.getItem(JWT);

    const headers = {
      ...{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      ...options,
    };

    if (!token || token === 'null') {
      delete headers.Authorization;
    }

    if (options && options['Content-Type'] === 'multipart/form-data') {
      delete headers['Content-Type'];
    }

    return headers;
  }

  // Common fetch
  internalFetch = (method, data) => fetch(this.url, {
    method,
    body: this.headers['Content-Type'] ? JSON.stringify(data) : data,
    headers: this.headers,
  });

  // REST calls
  get = () => this.internalFetch('GET');

  post = (data) => this.internalFetch('POST', data);

  put = (data) => this.internalFetch('PUT', data);

  patch = (data) => this.internalFetch('PATCH', data);

  delete = () => this.internalFetch('DELETE');
}

const newFetcher = (url, options) => new Fetcher(url, options);

export default newFetcher;
