import { getQueryParamsFromObj } from '../utils/api';
import { HTTP_METHODS, STATUS_CODES } from '../constants/network';
import { PATHS } from '../constants/api';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

const DEFAULT_QUERY = {
  'api_key': API_KEY,
};

// TODO: Optimize service calls
export const MoviesService = {
  async configuration(query, options) {
    const QUERY_PARAMS = getQueryParamsFromObj({ ...DEFAULT_QUERY, ...query});
    const URL = `${API_BASE_URL}${PATHS.CONFIGURATION}${QUERY_PARAMS}`;

    try {
      const response = await fetch(URL, {
        method: HTTP_METHODS.GET,
        headers: {
          ...DEFAULT_HEADERS,
        },
      });

      if (response.status !== STATUS_CODES.OK) {
        throw response;
      }

      return response.json();
    } catch (err) {
      console.error(err);
    }
  },
  async discover(query, options) {
    const QUERY_PARAMS = getQueryParamsFromObj({ ...DEFAULT_QUERY, ...query});
    const URL = `${API_BASE_URL}${PATHS.DISCOVER.MOVIE}${QUERY_PARAMS}`;

    try {
      const response = await fetch(URL, {
        method: HTTP_METHODS.GET,
        headers: {
          ...DEFAULT_HEADERS,
        },
      });

      if (response.status !== STATUS_CODES.OK) {
        throw response;
      }

      return response.json();
    } catch (err) {
      console.error(err);
    }
  },
  async search(query, options) {
    const QUERY_PARAMS = getQueryParamsFromObj({ ...DEFAULT_QUERY, query });
    const URL = `${API_BASE_URL}${PATHS.SEARCH.MOVIE}${QUERY_PARAMS}`;

    try {
      const response = await fetch(URL, {
        method: HTTP_METHODS.GET,
        headers: {
          ...DEFAULT_HEADERS,
        },
      });

      if (response.status !== STATUS_CODES.OK) {
        throw response;
      }

      return response.json();
    } catch (err) {
      console.error(err);
    }
  },
  async movieDetail(id, query, options) {
    const QUERY_PARAMS = getQueryParamsFromObj({ ...DEFAULT_QUERY, ...query});
    const URL = `${API_BASE_URL}${PATHS.MOVIE}/${id}${QUERY_PARAMS}`;

    try {
      const response = await fetch(URL, {
        method: HTTP_METHODS.GET,
        headers: {
          ...DEFAULT_HEADERS,
        },
      });

      if (response.status !== STATUS_CODES.OK) {
        throw response;
      }

      return response.json();
    } catch (err) {
      console.error(err);
    }
  },
}
