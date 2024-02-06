const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');

const app = express();

const adminroutes = require('./routes/admin');
const shoproutes = require('./routes/shop');

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(shoproutes);
app.use('/admin', adminroutes);

app.use ((req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);
