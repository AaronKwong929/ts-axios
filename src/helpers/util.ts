const toString = Object.prototype.toString;

export function isDate(val: any): val is Date {
    return toString.call(val) === '[object Date]';
}

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

// 深克隆
export function deepMerge(...objs: Array<any>): any {
    // 新建空对象
    const result = Object.create(null);
    
    objs.forEach(obj => {
        // 如果非空
        if (obj) {
            Object.keys(obj).forEach(key => {
                // 每个键对应的值
                const val = obj[key];
                
                if (isPlainObject(val)) {
                    // 值是对象
                    if (isPlainObject(result[key])) {
                        // 目标对象内该键的值是一个对象
                        result[key] = deepMerge(result[key], val);
                    } else {
                        // 目标对象内没有该键
                        result[key] = deepMerge(val);
                    }
                } else {
                    // 值不是对象
                    result[key] = val;
                }
            });
        }
    });

    return result;
}
