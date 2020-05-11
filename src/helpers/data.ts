import { isPlainObject } from './util';

// 如果是普通 object 要 JSON.stringify
export function transformRequest(data: any): any {
    if (isPlainObject(data)) {
        return JSON.stringify(data);
    }
    return data;
}
