import { isPlainObject } from './util';

// 如果是普通 object 要 JSON.stringify
export function transformRequest(data: any): any {
    if (isPlainObject(data)) {
        return JSON.stringify(data);
    }
    return data;
}

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
