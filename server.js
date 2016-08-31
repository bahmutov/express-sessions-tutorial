'use strict';

var http = require('http');
var fs = require('fs');
var app = require('express')();

app.use(require('morgan')('dev'));

app.set('views', './views')
app.set('view engine', 'pug')

var session = require('express-session');
var FileStore = require('session-file-store')(session);
var bodyParser = require('body-parser');
var csrf = require('csurf');

app.use(session({
  name: 'server-session-cookie-id',
  secret: 'my express secret',
  saveUninitialized: true,
  resave: true,
  store: new FileStore()
}));

var csrfProtection = csrf({
  cookie: false,
  sessionKey: 'session' // probably the default, req.session
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

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
  res.render('index', {
    pageTitle: 'Index page',
    views: req.session.views
  });
});

// protect form with CSRF
app.get('/form', csrfProtection, function (req, res) {
  // csrfProtection can create a new token for us to insert
  // into the FROM as a hidden input field
  res.render('form', {
    pageTitle: 'Form',
    csrfToken: req.csrfToken()
  })
});
// receive form submission
app.post('/process', csrfProtection, function (req, res) {
  console.log('form submission', req.body)
  res.redirect('/')
})

var port = process.env.PORT || 3000
var server = http.createServer(app).listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
