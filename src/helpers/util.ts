const toString = Object.prototype.toString;

export function isDate(val: any): val is Date {
    return toString.call(val) === '[Object Date]';
}

// export function isObject(val: any): val is Object {
//     return val !== null && toString.call(val) === 'object';
// }

export function isPlainObject(val: any): val is Object {
    return toString.call(val) === '[object Object]';
}

// mixin 将对象 U 的内容都丢进 T 里
export function extend<T, U>(to: T, from: U): T & U {
    for (const key in from) {
        (to as T & U)[key] = from[key] as any;
    }
    return to as T & U;
}
