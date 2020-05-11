import { AxiosRequestConfig } from './types/index';

export default function xhr(config: AxiosRequestConfig): void {
    const { data = null, url, method = 'get', headers } = config;

    const request = new XMLHttpRequest();

    request.open(method.toUpperCase(), url, true);

    Object.keys(headers).forEach(key => {
        // 没有 data，content-type不用传了
        if (data === null && key.toLowerCase() === 'content-type') {
            delete headers[name];
        } else {
            request.setRequestHeader(key, headers[key]);
        }
    });

    request.send(data);
}
