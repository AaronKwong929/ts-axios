import { AxiosRequestConfig, Method } from './../types/index';
import { isPlainObject, deepMerge } from './util';

// 将 headers 的 key 格式化
function normalizeHeaderName(headers: any, normalizedName: string): void {
    if (!headers) {
        return;
    }
    Object.keys(headers).forEach(key => {
        if (key !== normalizedName && key.toUpperCase() === normalizedName.toUpperCase()) {
            headers[normalizedName] = headers[key];
            delete headers[key];
        }
    });
}

export function handleHeaders(headers: any, data: any): any {
    // 有指定 headers的 content-type
    normalizeHeaderName(headers, 'Content-Type');

    if (isPlainObject(data)) {
        // 没有指定 content-type
        if (headers && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json;charset=utf-8';
        }
    }
    return headers;
}

// 格式化返回结果的 headers，一个json字符串，每一行由 \r\n 分隔
export function parseHeaders(headers: string): any {
    let parsed = Object.create(null);
    if (!headers) {
        return parsed;
    }

    headers.split('\r\n').forEach(item => {
        let [key, val] = item.split(':');
        key = key.trim().toLowerCase();
        if (!key) {
            return;
        }
        if (val) {
            val = val.trim();
        }
        parsed[key] = val;
    });
    return parsed;
}

// 扁平化 headers
export function flattenHeaders(headers: any, method: Method): any {
    if (!headers) {
        return headers;
    }

    headers = deepMerge(headers.common, headers[method], headers);

    const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common'];

    methodsToDelete.forEach(method => {
        delete headers[method];
    })

    return headers;
}
