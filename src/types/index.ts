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
    url?: string;
    method?: Method;
    data?: any;
    params?: any;
    headers?: any;
    responseType?: XMLHttpRequestResponseType;
    timeout?: number;
}

// 修改加入泛型参数 T
export interface AxiosResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: AxiosRequestConfig;
    request: any;
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosError extends Error {
    config: AxiosRequestConfig;
    code?: string | null;
    request?: any;
    response?: AxiosResponse;
    isAxiosError: boolean;
}

export interface axios {
    defaults: AxiosRequestConfig;

    interceptors: {
        request: AxiosInterceptorManager<AxiosRequestConfig>;
        response: AxiosInterceptorManager<AxiosResponse>;
    };

    request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>;

    get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
    head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
    options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;

    post<T = any>(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise<T>;
    put<T = any>(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise<T>;
    patch<T = any>(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise<T>;
}

// 混合类型接口
export interface AxiosInstance extends axios {
    <T = any>(config: AxiosRequestConfig): AxiosPromise<T>;

    <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
}

// 拦截器
export interface AxiosInterceptorManager<T> {
    use(resolve: ResolvedFn<T>, rejected?: ResolvedFn<T>): number;

    eject(id: number): void;
}

export interface ResolvedFn<T> {
    (val: T): T | Promise<T>;
}

export interface RejectedFn {
    (error: any): any;
}
