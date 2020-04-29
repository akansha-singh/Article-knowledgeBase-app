const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Connect to database
mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

// Check connection
db.once('open', function(){
    console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', function(err){
    console.log(err);
});

// Init App
const app = express();

// Bring in Models
let Article = require('./models/article');


// Load View Engine
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



// Home Route
app.get('/', (req,res) => {
Article.find({}, function(err,articles){
    if(err){
        console.log(err);
    } else {
        res.render('index',{
        title: 'Articles',
        articles: articles
    });
    }
});
});

// Add Route
app.get('/articles/add',function(req,res){
    res.render('add_article', {
        title: 'Add Article'
});
});

// Add Submit POST Route
app.post('/articles/add/', function(req,res){
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save((err) => {
        if(err){
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    });
});


// Start Server
app.listen(3000, function(){
    console.log('Server started at port 3000');
});