const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: String,
    overview: String,
    poster_path: String
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = { Movie };

