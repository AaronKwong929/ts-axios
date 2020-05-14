import { AxiosRequestConfig } from './../types/index';
import { isPlainObject, deepMerge } from '../helpers/util';

// 空对象：合并策略
const starts = Object.create(null);

// val2 可能出现的值
const startKeysFromVal2 = ['url', 'params', 'data'];

// 将 val2 的键全部加上 fromVal2Strat 的方法 => 键 url - 值 函数方法
// url params data 参数，只要传入的 config 有，就要合并到配置里面
// 没有就不管，用 fromVal2Strat
startKeysFromVal2.forEach(key => {
    starts[key] = fromVal2Start;
});

// 默认的合并方法，当 strats 对象没有这个键的对应方法的时候就用默认的
// val2 不为空就赋 val2 否则 val1
function defaultStart(val1: any, val2: any): any {
    return typeof val2 !== 'undefined' ? val2 : val1;
}

// 只看 val2，有值就赋
function fromVal2Start(val1: any, val2: any): any {
    if (typeof val2 !== 'undefined') return val2;
}

function deepMergeStart(val1: any, val2: any): any {
    if (isPlainObject(val2)) {
        // val2 是对象
        return deepMerge(val1, val2);
    } else if (typeof val2 !== 'undefined') {
        // val2 不是对象 且 val2 不为空
        return val2;
    } else if (isPlainObject(val1)) {
        // val2 不是对象，且 val2 为空，且 val1 为对象
        return deepMerge(val1);
    } else if (typeof val1 !== 'undefined') {
        // val2 不是对象， 且 val2 为空，且 val1 不是对象
        return val1;
    }
}

// headers需要深克隆
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
