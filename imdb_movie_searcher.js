const cheer = require('cheerio');
const request = require('request');

async function imdb_movie_searcher(movie_url, keywords) {
    return new Promise(function (resolve, reject) {
        //console.log(movie_url)
        request({
            method: 'GET',
            url: movie_url
        }, async (err, res, body) => {
            if (err) return console.error(err);

            let $ = cheer.load(body);
            let duration = ""
            let director = ""
            let genres = ""
            let mpaa = ""
            let times = []
            let ages = []
            let stars = ""
            let all_stars = []

            let name_search = '#__next > main > div > section > section > div > section > section > div > div > h1'
            let devolp_search = '#__next > main > div > section > section > div > section > section > div > div > div > a'
            let director_search = '#__next > main > div > section >  div > section > div > div  > section > ul > li > div > ul > li > a'
            let gneres_search = '#__next > main > div > section > div > section > div > div > section > div > ul > li > div > ul > li > a'
            let duration_search = '#__next > main > div > section > div > section > div > div > section > div > ul > li > div > ul > li > span'
            let mpaa_search = '#__next > main > div > section > section > div > section > section > div > div > div > ul > li > span'
            let stars_search = '#__next > main > div > section > section > div > section > section > div >div > div > div > ul > li > div > ul > li > a'

            let name = $(name_search).text();
            imdb_words = name.split(" ")
            keyword_words = keywords.split(" ")
            counter = 0
            flag = 0
            //check whether the words in the client search appears in that movie title
            for (let i = 0; i < keyword_words.length - 1; i++) {
                for (let j = 0; j < imdb_words.length; j++) {
                    if (imdb_words[j].toLowerCase().includes(keyword_words[i].toLowerCase())) {
                        counter++
                    }
                }
            }
            if (counter == keyword_words.length - 1) {
                flag = 1
            }

            //check if the movie exist at all
            let devolp = $(devolp_search).text();

            let j = 0
            $(director_search).each(function (i, e) {
                let href = ($(this).attr('href'))
                if (href.includes("tt_cl_dr")) { //dr for director
                    if (j == 0) {
                        director += $(this).text();
                    } else {
                        director += "," + $(this).text();
                    }
                    j++
                }
            });

            let m = 0
            $(gneres_search).each(function (i, e) {
                let href = ($(this).attr('href'))
                if (href.includes("genres")) {
                    if (m == 0) {
                        genres += $(this).text();
                        m++
                    } else {
                        genres += "," + $(this).text();
                    }
                }
            });

            $(duration_search).each(function (i, e) {
                //use regex to find the word that cintains the time
                let regex = /[0-9]h/
                times[i] = $(this).text();
                if (regex.test(times[i])) {
                    duration = times[i]
                }
            });

            $(mpaa_search).each(function (i, e) {
                ages[i] = $(this).text();
            });
            if (ages[1] != null) {
                mpaa = ages[1]
            }

            $(stars_search).each(function (i, e) {
                let href = ($(this).attr('href'))
                if (href.includes("tt_ov_st")) {   //st for stars            
                    all_stars.push($(this).text());            
                }
            });
            //remove dupliactes
            let all_stars_new = [...new Set(all_stars)]
            let n = 0
            for (let i = 0; i < all_stars_new.length; i++) {
                if (n == 0) {
                    stars += all_stars_new[i]
                    n++
                } else {
                    stars += ',' + all_stars_new[i]
                }
            }

            if ((devolp == "") && (flag > 0)) {
                data = name + "|" + genres + "|" + mpaa + "|" + duration + "|" + director + "|" + stars + "\n"
                resolve(data);
            } else {
                resolve("")
            }
        });
    });
}


module.exports = imdb_movie_searcher

//let a = imdb_movie_searcher("https://imdb.com/title/tt4756228/?ref_=fn_ft_tt_3", "star trek")

//a.then(data => console.log(data))
