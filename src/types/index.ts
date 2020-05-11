export type Method =
    | 'get'
    | 'GET'
    | 'post'
    | 'POST'
    | 'put'
    | 'PUT'
    | 'delete'
    | 'DELETE'
    | 'HEAD'
    | 'head'
    | 'options'
    | 'OPTIONS'
    | 'patch'
    | 'PATCH';

export interface AxiosRequestConfig {
    url: string;
    method?: Method;
    data?: any;
    params?: any;
    headers?: any;
}
