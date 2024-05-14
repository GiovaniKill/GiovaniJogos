import axios from 'axios';

const NODE_ENV = process.env.NODE_ENV;

const api = axios.create({
  baseURL: NODE_ENV === 'production' ? 'https://giovanijogos.fun/be' :
  `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,
});

/**
 *
 * @param {string} endpoint The URL of the requisition.
 * @param {boolean} wholeResponse False if you want just the data,
 * true for complete response.
 * @returns {any}
 */

export const getRequest = async (endpoint, wholeResponse) => {
  const response = await api.get(endpoint, {withCredentials: true});
  if (wholeResponse) return response;
  return response.data;
};

/**
 *
 * @param {string} endpoint The URL of the requisition.
 * @param {object} body The data to be sent.
 * @param {boolean|undefined} wholeResponse False if you want just the data,
 * true for complete response.
 * @returns {any}
 */

export const postRequest = async (endpoint, body, wholeResponse) => {
  const response = await api.post(endpoint, body, {withCredentials: true});
  if (wholeResponse) return response;
  return response.data;
};

/**
 *
 * @param {string} endpoint The URL of the requisition.
 * @param {object} body The data to be sent.
 * @param {boolean|undefined} wholeResponse False if you want just the data,
 * true for complete response.
 * @returns {any}
 */

export const deleteRequest = async (endpoint, wholeResponse) => {
  const response = await api.delete(endpoint, {withCredentials: true});
  if (wholeResponse) return response;
  return response.data;
};

