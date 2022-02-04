const fs=require('fs')
const path = require('path')

module.exports = {
    getImgCarousel:JSON.parse(fs.readFileSync('./src/data/carousel.json','utf-8'))
}