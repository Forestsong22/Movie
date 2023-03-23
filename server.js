const express = require('express');
const nunjucks = require('nunjucks');
const movierouter = require('./routes/movie');
const indexrouter = require('./routes/index')
const Logger = require('morgan');
const app = express();
const port = process.env.PORT;

// app.set
app.set('view engine', 'html');
nunjucks.configure('templates',{
    autoescape : true,
    express:app,
    watch: true,
})

// app.use
app.use(express.urlencoded({extended : false }));
app.use(express.static('public'))
app.use(Logger('dev'));


// router
app.use('/', indexrouter)
app.use('/movie', movierouter)



// server
app.listen(port,()=>{
    console.log(`${port} 작동중`)
});