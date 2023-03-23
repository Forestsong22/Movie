require('dotenv').config();
const MOVIE_API = process.env.TMDB_API;
const { Movie } = require('../models/movie');
const { Today } = require('../models/today');

// 영화 정보 db에 저장
const addMovie = async (name) => {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + MOVIE_API + '&language=ko-KR&query=' + `${name}`

    let result = []
    let response = await fetch(url)
    let data = await response.json()
    let movie_title = data['results'][0]['title']
    let movie_overview = data['results'][0]['overview']
    let poster_path = data['results'][0]['poster_path']
    result.push(movie_title, movie_overview, poster_path)

    let dataset = new Movie({
        title: movie_title,
        overview: movie_overview,
        poster_path: poster_path
    })
    dataset.save().then(res=>console.log(res)).catch(err=>console.log(err))
};

// 영화 검색하면 영화 정보 가져옴.
const titledata = async (name) => {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + MOVIE_API + '&language=ko-KR&query=' + `${name}`

    let response = await fetch(url)
    let data = await response.json()
    return data
};




module.exports = {titledata, addMovie} 


