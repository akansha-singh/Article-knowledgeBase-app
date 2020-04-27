const express = require('express');
const path = require('path');

// Init App
const app = express();

// Load View Engine
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// Home Route
app.get('/', (req,res) => {
    res.render('index',{
        title: 'Articles'
    });
});

// Start Server
app.listen(3000, function(){
    console.log('Server started at port 3000');
});