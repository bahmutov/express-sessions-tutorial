'use strict';

var host = process.env.HOST || 'localhost'
var port = process.env.PORT || 3000

var http = require('http');
var express = require('express');
var app = express();

app.use(require('morgan')('dev'));

app.set('views', './views')
app.set('view engine', 'pug')

var session = require('express-session');
var FileStore = require('session-file-store')(session);
var bodyParser = require('body-parser');
var csrf = require('csurf');
var cookieParser = require('cookie-parser');

var subdomain = require('express-subdomain');
var router = express.Router();

app.use(session({
  name: 'server-session-cookie-id',
  secret: 'my express secret',
  saveUninitialized: true,
  resave: true,
  store: new FileStore()
}));

var csrfProtection = csrf({
  cookie: {
    key: '_csrf',
    domain: 'localhost'
  }
})

// we need this because "cookie" is true in csrfProtection
app.use(cookieParser())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse JSON bodies
app.use(bodyParser.json())

app.get('/', function initViewsCount(req, res, next) {
  if (typeof req.session.views === 'undefined') {
    req.session.views = 0;
    return res.render('index', {
      pageTitle: 'First visit',
      host: host,
      port: port,
      views: req.session.views
    });
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
    host: host,
    port: port,
    views: req.session.views
  });
});

//
// form will be in the sub domain
//

// protect form with CSRF
router.get('/form', csrfProtection, function (req, res) {
  // csrfProtection can create a new token for us to insert
  // into the FROM as a hidden input field
  res.render('form', {
    pageTitle: 'Form',
    csrfToken: req.csrfToken()
  })
});
// receive form submission
router.post('/process', csrfProtection, function (req, res) {
  console.log('form submission', req.body)
  res.redirect('/')
})

// receive JSON post
router.post('/fetch', csrfProtection, function (req, res) {
  console.log('fetch POST', req.body)
  res.send({status: 'ok'})
})

app.use(subdomain('forms', router))

var server = http.createServer(app).listen(port, function () {
  console.log('Example app listening at http://%s:%s', host, port);
});
