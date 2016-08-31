'use strict';

var http = require('http');
var fs = require('fs');
var app = require('express')();

app.use(require('morgan')('dev'));

app.set('views', './views')
app.set('view engine', 'pug')

var session = require('express-session');
var FileStore = require('session-file-store')(session);

app.use(session({
  name: 'server-session-cookie-id',
  secret: 'my express secret',
  saveUninitialized: true,
  resave: true,
  store: new FileStore()
}));

app.get('/', function initViewsCount(req, res, next) {
  if (typeof req.session.views === 'undefined') {
    req.session.views = 0;
    return res.end('Welcome to the file session demo. Refresh page!');
  }
  return next();
});

app.get('/', function incrementViewsCount(req, res, next) {
  console.assert(typeof req.session.views === 'number',
    'missing views count in the session', req.session);
  req.session.views++;
  return next();
});

app.use(function printSession(req, res, next) {
  console.log('req.session', req.session);
  console.log('req header referer', req.header('Referer'));
  console.log('req header x-token', req.header('x-token'));
  return next();
});

app.get('/', function sendPageWithCounter(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Referer', 'server referer');
  res.write('<p>views: ' + req.session.views + '</p>\n');
  res.end();
});

app.get('/form', function (req, res) {
  res.render('form', {pageTitle: 'Form'})
});

var port = process.env.PORT || 3000
var server = http.createServer(app).listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at https://%s:%s', host, port);
});
