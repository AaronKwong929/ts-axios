import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index';
import xhr from './xhr';
import { buildURL } from '../helpers/url';
import { transformRequest, transformResponse } from '../helpers/data';
import { handleHeaders } from '../helpers/headers';

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
    handleConfig(config);
    return xhr(config).then(res => {
        // 对 data 做响应处理后再返回 res 可以继续链式调用
        return transformResponseData(res);
    });
}

function handleConfig(config: AxiosRequestConfig): void {
    config.url = transformUrl(config);

    config.headers = transformHeaders(config); // 注意顺序，要在data之前，不然传值会变成 JSON.stringify 后的值

    config.data = transformRequestData(config);
}

// 格式化 url
function transformUrl(config: AxiosRequestConfig): string {
    const { url, params } = config;
    return buildURL(url!, params);
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

// 格式化response data
function transformResponseData(res: AxiosResponse) {
    res.data = transformResponse(res.data);
    return res;
}

