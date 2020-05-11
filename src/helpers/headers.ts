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
    // 格式化 headers 字段
    normalizeHeaderName(headers, 'Content-Type');
    
    // 没有指定 headers
    if (isPlainObject(data)) {
        if (headers && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json;charset=utf-8';
        }
    }
    return headers;
}
