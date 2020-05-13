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

    constructor() {
        // axios.interceptors.request.use // axios.interceptors.response.use

        // 实例化
        this.interceptors = {
            request: new InterceptorManager<AxiosRequestConfig>(),
            response: new InterceptorManager<AxiosResponse>(),
        };
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

        // 链中是一堆拦截器
        const chain: PromiseChain<any>[] = [
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

        let promise = Promise.resolve(config);

        // 链式调用
        while (chain.length) {
            const { resolved, rejected } = chain.shift()!;
            promise = promise.then(resolved, rejected);
        }

        // return dispatchRequest(config);
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
