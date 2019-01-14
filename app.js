var express = require('express');
var path = require('path');
global.appRoot = path.resolve(__dirname);
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var instaCookieMiddleware = require('./middlewares/instaCookieMiddleware');

var indexRouter = require('./routes/index');
var storyRouter = require('./routes/story');
var highlightRouter = require('./routes/highlight');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(instaCookieMiddleware());

app.use('/', indexRouter);
app.use('/stories', storyRouter);
app.use('/highlights', highlightRouter);


module.exports = app;
