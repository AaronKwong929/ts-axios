import { ResolvedFn, RejectedFn } from './../types/index';
interface Interceptor<T> {
    resolved: ResolvedFn<T>;
    rejected?: RejectedFn;
}

export default class InterceptorManager<T> {
    private interceptors: Array<Interceptor<T> | null>;

    constructor() {
        this.interceptors = [];
    }

    use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
        this.interceptors.push({
            resolved,
            rejected,
        });
        return this.interceptors.length - 1;
    }

    eject(id: number): void {
        // 如果用 splice 的话 id 会乱掉
        if (this.interceptors[id]) {
            this.interceptors[id] = null;
        }
    }

    // 实现内部逻辑用的所以不用在 types/index.ts 暴露
    forEach(fn: (interceptor: Interceptor<T>) => void): void {
        this.interceptors.forEach(interceptor => {
            if (interceptor !== null) {
                fn(interceptor);
            }
        });
    }
}
