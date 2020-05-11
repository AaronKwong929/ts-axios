import { isPlainObject } from './util';

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
    normalizeHeaderName(headers, 'Content-Type');
    if (isPlainObject(data)) {
        if (headers && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json;charset=utf-8';
        }
    }
    return headers;
}
