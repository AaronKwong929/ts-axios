import {
    AxiosRequestConfig,
    AxiosPromise,
    Method,
    AxiosResponse,
    ResolvedFn,
    RejectedFn,
} from './../types/index';
import dispatchRequest from './dispatchRequest';
import InterceptorManager from './interceptorManager';
import mergeConfig from './mergeConfig';

interface Interceptors {
    request: InterceptorManager<AxiosRequestConfig>;
    response: InterceptorManager<AxiosResponse>;
}

interface PromiseChain<T> {
    resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise);
    rejected?: RejectedFn;
}

export default class Axios {
    interceptors: Interceptors;
    // 初始化的配置
    defaults: AxiosRequestConfig;

    constructor(initConfig: AxiosRequestConfig) {
        // axios.interceptors.request.use // axios.interceptors.response.use
        // 实例化
        this.interceptors = {
            request: new InterceptorManager<AxiosRequestConfig>(),
            response: new InterceptorManager<AxiosResponse>(),
        };

        // 导入配置
        this.defaults = initConfig;
    }

    request(url: any, config?: any): AxiosPromise {
        if (typeof url === 'string') {
            if (!config) {
                config = {};
            }
            config.url = url;
        } else {
            // 如果只传了config，config是在url位置上的，原config位置为undefined，
            config = url;
        }

        // 发送请求前要合并config
        config = mergeConfig(this.defaults, config);

        // 链中是一堆拦截器
        const chain: PromiseChain<any>[] = [
            // promise链初始化的时候第一个是 dispatchRequest ，然后是跟着的一堆拦截器
            {
                resolved: dispatchRequest,
                rejected: undefined,
            },
        ];

        // 请求拦截器后添加的先执行
        this.interceptors.request.forEach(interceptor => {
            chain.unshift(interceptor);
        });

        // 响应拦截器先添加的先执行
        this.interceptors.response.forEach(interceptor => {
            chain.push(interceptor);
        });

        // Promise.resolve(config) 相当于将 config 传入 then 
        let promise = Promise.resolve(config);

        // 链式调用
        while (chain.length) {
            const { resolved, rejected } = chain.shift()!; // 取出第一个并返回它的值，解构
            promise = promise.then(resolved, rejected);
        }

        return promise;
    }

    get(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('GET', url, config);
    }

    delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('DELETE', url, config);
    }

    head(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('HEAD', url, config);
    }

    options(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('OPTIONS', url, config);
    }

    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('POST', url, data, config);
    }

    put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('PUT', url, data, config);
    }

    patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('PATCH', url, data, config);
    }

    // 抽象出来的方法
    _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
        return this.request(
            Object.assign(config || {}, {
                method,
                url,
            })
        );
    }

    _requestMethodWithData(method: Method, url: string, data: any, config?: AxiosRequestConfig) {
        return this.request(
            Object.assign(config || {}, {
                method,
                data,
                url,
            })
        );
    }
}
