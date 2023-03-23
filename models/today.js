const mongoose = require('mongoose');

const todaySchema = mongoose.Schema({
        adult: Boolean,
        backdrop_path: String,
        id: Number,
        title: String,
        original_language: String,
        original_title: String,
        overview: String,
        poster_path: String,
        media_type: String,
        genre_ids: Array,
        popularity: Number,
        release_date: String,
        video: Boolean,
        vote_average: Number,
        vote_count: Number,        
})

const Today = mongoose.model('Today', todaySchema)

module.exports = { Today }