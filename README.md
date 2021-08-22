# Imdb-movies-data
## Discription
Get values such as name, genres, stars, and so on, of every movie that the searcher of imdb movies can find for specific keywords given by the user, and prnit in to txt file.

## Files
There are 2 js files:
the imdb_movies_data.js file gets the keyword that the user provided and make a list of every url of movie that the search engine of imdb movies provided, and for each one of them, calls the imdb_movie_searcher.js that gets the url and extract all of the relavent information about  the movie, and sent it back to imdb_movies_data.js that write in into a txt file called Output.txt
there is also an Output.txt, sample of the output of the code for the "Star Trek" keywords.

## Prerequisites
In order to work on the app, some moudels need to be insalled:
* npm install request, which let us get the html from the web.
* npm install cheero, which let us parse the html of the website.

## How to use
run node imdb_movies_data.js args[...] which args means the name of the movie we want to search for.
