import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index';
import { parseHeaders } from '../helpers/headers';
import { createError } from '../helpers/error';

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve, reject) => {
        const { data = null, url, method = 'get', headers, responseType, timeout } = config;

        const request = new XMLHttpRequest();

        if (responseType) {
            request.responseType = responseType;
        }

        if (timeout) {
            request.timeout = timeout;
        }

        request.open(method.toUpperCase(), url!, true);

        request.onreadystatechange = function handleLoad() {
            if (request.readyState !== 4) {
                return;
            }

            if (request.status === 0) {
                return;
            }

            const responseHeaders = parseHeaders(request.getAllResponseHeaders());

            const responseData = responseType !== 'text' ? request.response : request.responseText;

            const response: AxiosResponse = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request,
            };
            handleResponse(response);
        };

        request.onerror = function handleError() {
            reject(createError('Network error', config, null, request));
        };

        request.ontimeout = function handleTimeout() {
            reject(
                createError(`Connection timeout of ${timeout}`, config, 'ECONNABORTED', request)
            );
        };

        Object.keys(headers).forEach(key => {
            // 没有 data，content-type不用传了
            if (data === null && key.toLowerCase() === 'content-type') {
                delete headers[name];
            } else {
                request.setRequestHeader(key, headers[key]);
            }
        });

        request.send(data);

        function handleResponse(res: AxiosResponse): void {
            if (res.status > 200 && res.status < 300) {
                resolve(res);
            } else {
                reject(
                    createError(
                        `request failed with status code ${res.status}`,
                        config,
                        null,
                        request,
                        res
                    )
                );
            }
        }
    });
}
