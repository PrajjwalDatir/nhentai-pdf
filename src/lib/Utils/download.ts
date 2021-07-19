import fetcher from './fetcher'
import { writeFile } from 'fs/promises'
import { tmpdir } from 'os'
const fileformat = (url: string): string => {
    const array = url.split('/')
    return array[array.length - 1].split('.')[1]
}
const download = async (
    url: string,
    filename = `${tmpdir()}/${Math.random().toString()}.${fileformat(url)}`
): Promise<string> => {
    const image = await fetcher('get')<'arraybuffer', Buffer>(url, 'arraybuffer')
    await writeFile(filename, image)
    return filename
}

export default download
