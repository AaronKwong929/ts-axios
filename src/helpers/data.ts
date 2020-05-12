import { isPlainObject } from './util';

// 如果是普通 object 要 JSON.stringify
export function transformRequest(data: any): any {
    if (isPlainObject(data)) {
        return JSON.stringify(data);
    }
    return data;
}

// 将 res.data 从 JSON 字符串转换成对象
export function transformResponse(data: any): any {
    if (typeof data === 'string') {
        try {
            data = JSON.parse(data);
        } catch {
            //
        }
    }
    return data;
}
