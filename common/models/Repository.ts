/**
 * Read operations
 */
export interface Readable<T> {
    getAll(): Promise<T[]>;
    get(id: string): Promise<T | undefined>;
}

/**
 * Write operations
 */
export interface Writable<T> {
    create(item: T): Promise<T>;
    update(item: T): Promise<T>;
    delete(id: string): Promise<void>;
}

/**
 * Base repository
 */
export interface Repository<T> extends Readable<T>, Writable<T> {
    getAll(): Promise<T[]>;
    get(id: string): Promise<T | undefined>;
    create(item: T): Promise<T>;
    update(item: T): Promise<T>;
    delete(id: string): Promise<void>;
}
