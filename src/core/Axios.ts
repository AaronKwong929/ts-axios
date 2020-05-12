import { AxiosRequestConfig, AxiosPromise, Method } from './../types/index';
import dispatchRequest from './dispatchRequest';

export default class Axios {
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
        return dispatchRequest(config);
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
