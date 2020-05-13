import { AxiosRequestConfig } from './types/index';

const defaults: AxiosRequestConfig = {
    method: 'GET',
    timeout: 0,
    headers: {
        common: {
            Accept: 'applcation/json, text/plain, */*',
        },
    },
};

const methodsNoData = ['delete', 'get', 'options', 'head'];

methodsNoData.forEach(method => {
    defaults.headers[method] = {};
});

const methodsWithData = ['post', 'put', 'patch'];

methodsWithData.forEach(method => {
    defaults.headers[method] = {
        'Content-Type': 'application/x-www-form-urlencoded',
    };
});

export default defaults;
