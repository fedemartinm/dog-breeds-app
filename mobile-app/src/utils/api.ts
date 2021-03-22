import { BaseURL } from '../consts/api';

/**
 * API Helper
 * @param method get, post, put or delete
 * @param input url
 * @param body optional body value
 * @returns
 */
export async function api<T>(method: 'get' | 'post' | 'put' | 'delete', input: RequestInfo, body?: any): Promise<T> {
    let requestInit: RequestInit = {
        method,
        headers: { 'content-type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
    };

    const result = await fetch(`${BaseURL}${input}`, requestInit);

    if (!result.ok) {
        throw new Error(result.statusText);
    } else {
        return (await result.json()) as Promise<T>;
    }
}
