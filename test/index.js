const { Doujin } = require('../dist')

const doujin = new Doujin('https://nhentai.net/g/366327/')
doujin.validate().then(console.log)
doujin.fetch().then(console.log)
doujin.save().then(console.log)
