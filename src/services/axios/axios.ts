import axios, { AxiosRequestConfig } from 'axios';
import globalConfig from '../../config/global.config';
import { getItem } from '../storage';

const { BASE_URL } = globalConfig;

const source = axios.CancelToken.source();

const instance = axios.create({
    baseURL: BASE_URL,
    cancelToken: source.token,
} as AxiosRequestConfig);

// put the access token in the header of every request
instance.interceptors.request.use(async (config) => {
    const token = await getItem('jwt_token');
    if (token) {
        config.headers!['Authorization'] = `Bearer ${token}`;
    }

    return config;
});

export default instance;
