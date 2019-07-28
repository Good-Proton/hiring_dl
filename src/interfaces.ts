export type PersonId = number;

interface IAsyncIterator<T> {
    next(): Promise<{
        done: false
        value: T
    } | {
        done: true
    }>
}

export interface IAsyncIterable<T> {
    [Symbol.asyncIterator](): IAsyncIterator<T>
}

export interface ICollection<T> extends IAsyncIterable<T> {
    readonly size: Promise<number>
    readonly length: Promise<number>
    readonly first: Promise<T | undefined>
    readonly last: Promise<T | undefined>

    [Symbol.asyncIterator](): IAsyncIterator<T>

    /**
     * Returns element at index `i` of an collection.
     */
    get(i: number): Promise<T | undefined>

    /**
     * Returns a section of an collection.
     * @param start The beginning of the specified portion of the collection.
     * @param end The end of the specified portion of the collection.
     */
    slice(start?: number, end?: number): Promise<T[]>;
}
