import axios from 'axios'
import { EventEmitter } from 'events'
import parse from './parse'
import ValidateID from './Decorators/ValidateID'
import fetcher from './Utils/fetcher'
import { Document } from './PDF'
import { writeFile } from 'fs/promises'
export default class Doujin extends EventEmitter {
    @ValidateID()
    id: string

    private _info: IDoujinInfo | null = null

    constructor(id: string) {
        super()
        this.id = id
    }

    get info(): IDoujinInfo {
        if (!this._info) throw new Error('Invalid')
        return this._info
    }

    private get _url() {
        return `https://nhentai.net/g/${this.id}`
    }

    validate = (): Promise<boolean> =>
        axios
            .get(this._url)
            .then(() => true)
            .catch(() => false)

    fetch = async (): Promise<IDoujinInfo> => {
        const result = await fetcher('get')<'json', string>(this._url, 'json')
        this._info = parse(result, this._url)
        return this.info
    }

    pdf = async (filename?: string): Promise<Buffer> => {
        if (!this._info) await this.fetch()
        const PDF = new Document(this._info?.pages as [], 'A4')
        const buffer = await PDF.build()
        if (filename) await writeFile(filename as unknown as string, buffer)
        return buffer
    }

    save = async (filename?: string): Promise<string> => {
        if (!this._info) await this.fetch()
        filename = filename || `${this.info.title}.pdf`
        await this.pdf(filename)
        return filename
    }
}

export interface IDoujinInfo {
    title: string
    details: {
        parodies: string[]
        characters: string[]
        tags: string[]
        artists: string[]
        groups: string[]
        languages: string[]
        categories: string[]
        pages: number
    }
    pages: string[]
    link: string
}
