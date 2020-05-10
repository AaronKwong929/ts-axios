import { AxiosRequestConfig } from './types/index';
import xhr from './xhr';
import { buildURL } from './helpers/url';

function axios(config: AxiosRequestConfig): void {
    handleConfig(config);
    xhr(config);
}

function handleConfig(config: AxiosRequestConfig): void {
    config.url = transformUrl(config);
}

function transformUrl(config: AxiosRequestConfig): string {
    const { url, params } = config;
    return buildURL(url, params);
}

export default axios;
