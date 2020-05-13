import { AxiosRequestConfig } from './../types/index';
import { isPlainObject, deepMerge } from '../helpers/util';

const starts = Object.create(null);

const startKeysFromVal2 = ['url', 'params', 'data'];

startKeysFromVal2.forEach(key => {
    starts[key] = fromVal2Start;
});

function defaultStart(val1: any, val2: any): any {
    return typeof val2 !== 'undefined' ? val2 : val1;
}

function fromVal2Start(val1: any, val2: any): any {
    if (typeof val2 !== 'undefined') return val2;
}

function deepMergeStart(val1: any, val2: any): any {
    // val2 可能是个字符串 可能不是对象
    if (isPlainObject(val2)) {
        return deepMerge(val1, val2);
    } else if (typeof val2 !== 'undefined') {
        return val2;
    } else if (isPlainObject(val1)) {
        return deepMerge(val1);
    } else if (typeof val1 !== 'undefined') {
        return val1;
    }
}

const startKeysDeepMerge = ['headers'];

startKeysDeepMerge.forEach(key => {
    starts[key] = deepMergeStart;
});

/**
 * 接收两个配置
 * 对两个配置进行遍历获取 key
 * 然后调用 mergeField
 * 通过 key 得到合并策略函数
 * 然后进行合并 并返回 config
 *
 * （策略模式）
 */
export default function mergeConfig(
    config1: AxiosRequestConfig,
    config2?: AxiosRequestConfig
): AxiosRequestConfig {
    if (!config2) {
        config2 = {};
    }

    const config = Object.create(null);

    for (let key in config2) {
        mergeField(key);
    }

    for (let key in config1) {
        if (!config2[key]) {
            mergeField(key);
        }
    }

    return config;

    function mergeField(key: string): void {
        const strat = starts[key] || defaultStart;
        config[key] = strat(config1[key], config2![key]);
    }
}
