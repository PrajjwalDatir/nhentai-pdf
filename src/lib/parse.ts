import cheerio from 'cheerio'
import { IDoujinInfo } from './Doujin'

const parse = (text: string, link: string): IDoujinInfo => {
    const $ = cheerio.load(text)
    const details: Partial<IDoujinInfo['details']> = {}
    $('.tag-container.field-name')
        .text()
        .split('\n')
        .map((string) => string.trim())
        .filter((u) => u)
        .map((tag, i, tags) => {
            if (tag.endsWith(':') && !tags[i + 1].endsWith(':'))
                details[tag.substring(0, tag.length - 1).toLowerCase() as keyof IDoujinInfo['details']] = tags[i + 1]
                    .replace(/(\([0-9,]+\))([a-zA-Z])/g, '$1 $2')
                    .split(/(?<=\))\s(?=[a-zA-Z])/)
        })
    return {
        title: $('#info').find('h1').text(),
        details: details as IDoujinInfo['details'],
        pages: Object.entries($('.gallerythumb').find('img'))
            .map((image) => {
                return image[1].attribs
                    ? image[1].attribs['data-src'].replace(/t(\.(jpg|png))/, '$1').replace('t.nhentai', 'i.nhentai')
                    : null
            })
            .filter((link) => link) as string[],
        link
    }
}

export default parse
