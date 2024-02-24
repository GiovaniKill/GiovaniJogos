import axios from 'axios';

const NODE_ENV = process.env.NODE_ENV;

const api = axios.create({
  baseURL: NODE_ENV ? 'https://giovanijogos.fun/be/' :
  `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,
});

export const requestData = async (endpoint) => {
  const {data} = await api.get(endpoint);
  return data;
};
