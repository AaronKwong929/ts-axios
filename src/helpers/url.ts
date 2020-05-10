import { isObject, isDate } from 'util';

/**
 *
 * 把encodeURIComponent 的字符串的特殊值替换回原来的
 */

function encode(val: string): string {
    return encodeURIComponent(val)
        .replace(/%40/g, '@')
        .replace(/%3A/g, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, '=')
        .replace(/%5B/g, '[')
        .replace(/%5D/g, ']');
}

export function buildURL(url: string, params?: any): string {
    // 没有 params 直接返回 url
    if (!params) {
        return url;
    }

    const parts: string[] = [];

    // 获取所有 params 的 key
    Object.keys(params).forEach(key => {
        // 获取 key 的 value
        const val = params[key];

        // val 为 falsy 时，跳出本次循环开始下一个循环
        if (val === null || typeof val === 'undefined') {
            return;
        }

        // 临时数组
        let values = [];

        // 如果本轮循环的 val 是数组，直接丢给临时数组 values，请求内的参数应该： ?key[]=val1&key[]=val2
        if (Array.isArray(val)) {
            values = val;
            key += '[]';
        } else {
            // 如果 val 不是数组，将 val 数组化并丢给临时数组 values
            values = [val];
        }

        // 将 values 的值和 key 格式化丢给 parts
        values.forEach(item => {
            if (isDate(item)) {
                item = item.toISOString();
            } else if (isObject(item)) {
                item = JSON.stringify(item);
            }
            parts.push(`${encode(key)}=${encode(item)}`);
        });
    });

    // 将 parts 用 & 连接
    let serializedParams = parts.join('&');
    // 如果数组非空
    if (serializedParams) {
        // 如果地址有 hash tag，移除 hash tag 部分
        const hashIndex = url.indexOf('#');
        if (hashIndex !== -1) {
            url = url.slice(0, hashIndex);
        }
        // 如果地址本身有参数
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }
    return url;
}
