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
