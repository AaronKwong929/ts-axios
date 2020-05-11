import { AxiosRequestConfig } from './types/index';
import xhr from './xhr';
import { buildURL } from './helpers/url';
import { transformRequest } from './helpers/data';
import { handleHeaders } from './helpers/headers';

function axios(config: AxiosRequestConfig): void {
    handleConfig(config);
    xhr(config);
}

function handleConfig(config: AxiosRequestConfig): void {
    config.url = transformUrl(config);
    
    config.headers = transformHeaders(config); // 注意顺序，要在data之前，不然传值会变成 JSON.stringify
    
    config.data = transformRequestData(config);
}

// 格式化 url
function transformUrl(config: AxiosRequestConfig): string {
    const { url, params } = config;
    return buildURL(url, params);
}

// 格式化 data
function transformRequestData(config: AxiosRequestConfig): any {
    return transformRequest(config.data);
}

// 格式化 headers
function transformHeaders(config: AxiosRequestConfig): any {
    const { headers = {}, data } = config;
    return handleHeaders(headers, data);
}

export default axios;
