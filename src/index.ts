import cheerio from 'cheerio';
import { request } from 'http';
import { type } from 'os';
// visit content of the url using cheerio
function getHtml(url: string) {
    return new Promise((resolve, reject) => {
        request(url, (err type: string, response: any, html: any) => {
            if (err) {
                reject(err);
            }
            if (response.statusCode !== 200) {
                reject(response);
            }
            resolve(html);
        });
    });
}
// get the content of the url and call the callback with the content
function getContent(url, callback) {
    return getHtml(url).then(html => callback(cheerio.load(html)));
}
// get the content of the url and call the callback with the content
function getContentSync(url) {
    return getHtml(url).then(html => cheerio.load(html));
}
export { getContent, getContentSync };