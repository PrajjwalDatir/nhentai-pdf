// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Doujin } = require('../dist')

const doujin = new Doujin('https://nhentai.net/g/177013/')
doujin.validate().then(console.log)
doujin.fetch().then(console.log)
doujin.save().then(console.log)
