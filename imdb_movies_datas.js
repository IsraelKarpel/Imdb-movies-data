const cheer = require('cheerio');
const request = require('request');
const fs = require('fs');
const getData = require('./imdb_movie_searcher');
var url2 = ""
let keyword = ""

var args = process.argv;
args.forEach((val, index) => {
    if (index > 1) {
        keyword += val + " "
    }
});


request({
    method: 'GET',
    url: 'https://www.imdb.com/find?q=' + keyword + '&s=tt&ttype=ft'
}, async (err, res, body) => {
    if (err) return console.error(err);

    let $ = cheer.load(body);
    let title = $('.result_text > a');
    let length = title.length
    let j = 0
    for (let i = 0; i < length; i++) {
        url2 = "https://imdb.com" + title[i].attribs.href;
        let data = await getData(url2, keyword)
        if (data != "") {
            //if this is the first time writing, than create the file ans write into it 
            if (j == 0) {
                fs.writeFile('Output.txt', data, function (err) {
                    if (err) throw err;
                });
                j++
            //if the file already exist
            } else {
                fs.appendFile('Output.txt', data, function (err) {
                    if (err) throw err;
                });
            }
        }
    }
});
