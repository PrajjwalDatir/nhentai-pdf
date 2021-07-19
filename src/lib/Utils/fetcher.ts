import axios, { ResponseType } from 'axios'

type Headers = { [Header: string]: string }

const get = async <T extends 'json' | 'arrayBuffer', R>(
    url: string,
    type: T,
    headers?: Headers
): Promise<T extends 'buffer' ? Buffer : R> =>
    (
        await axios.get(url, {
            headers,
            responseType: type as ResponseType
        })
    ).data

const post = async <R>(url: string, data: string, headers?: Headers): Promise<R> =>
    (await axios.post(url, data, { headers })).data

const fetcher = <M extends Methods>(method: M): Method<M> => (method === 'post' ? post : get) as Method<M>

export default fetcher

type Methods = 'get' | 'post'
type Method<M extends Methods> = M extends 'post' ? typeof post : typeof get
