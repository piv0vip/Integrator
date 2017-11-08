export interface IServerable<T> {
    Parse(arg: T);
    toServer(): T;
}