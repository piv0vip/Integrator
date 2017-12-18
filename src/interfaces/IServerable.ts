export interface IServerable<T> {
    load(arg: T);
    toServer(): T;
}