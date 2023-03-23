require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {titledata, addMovie} = require('../controller/movie');
const {todayMovie, getNow, getNowSelect} = require('../controller/today');
const { Today } = require('../models/today');
const MONGO_URI = process.env.MONGODB_URI;
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;


// mongoose.connect(MONGO_URI,{
//     dbName: 'Movie',
//     useNewUrlParser: true,
// }).then(res => console.log('mongodb connected..!')).catch(err => console.error(err))



router.get('/', (req,res) =>{
    todayMovie().then(response => res.render('index', {poster0: IMAGE_BASE_URL + response[0]['poster_path'],
    poster1: IMAGE_BASE_URL + response[1]['poster_path'], poster2: IMAGE_BASE_URL + response[2]['poster_path'],
    poster3: IMAGE_BASE_URL + response[3]['poster_path'],poster4: IMAGE_BASE_URL + response[4]['poster_path']})).catch(err => console.log(err))
});


router.post('/movie', (req, res) => {
    let { title } = req.body
    titledata(`${title}`).then(response => response['results'][0])
    .then(data => res.render('search',{title: data['title'], overview: data['overview'], poster: IMAGE_BASE_URL + data['poster_path'], backdrop_path:IMAGE_BASE_URL + data['backdrop_path'] }))
    .catch(err => console.log(err))
});

router.get('/movie/:params', (req, res) => {
    let { params } = req.params
    titledata(`${params}`).then(response => res.send(response)).catch(err=>console.log(err))
    addMovie(`${params}`).then(response => console.log(response)).catch(err => console.log(err))
});


router.get('/now', (req, res) => {
    getNow().then(function(data){res.render('now', {movieinfo: data})})
});

router.get('/now/:params', (req, res) => {
    let {params} = req.params
    getNowSelect(`${params}`).then(data => res.render('nowSelect', {title : data['title'],overview: data['overview'], poster: IMAGE_BASE_URL + data['poster_path']})).catch(err => console.log(err))
});

router.post('/login', (req,res) => {
    res.render('login')
})

router.get('/join', (req,res) => {
    res.render('join')
})
module.exports = router;