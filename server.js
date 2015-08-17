var app = require('express')();
app.use(require('cookie-parser'));
var session = require('express-session');
var FileStore = require('session-file-store')(session);

app.use(session({
  name: 'server-session-cookie-id',
  secret: 'my express secret',
  saveUninitialized: true,
  resave: true,
  store: new FileStore()
}));

app.get('/', function initViewsCount(req, res) {
  if (typeof req.session.views === 'undefined') {
    req.session.views = 1;
    res.end('Welcome to the file session demo. Refresh page!');
  }
});

app.get('/', function printViewsCount(req, res) {
  console.assert(req.session.views,
    'missing views count in the session', req.session);
  req.session.views++;
  res.setHeader('Content-Type', 'text/html');
  res.write('<p>views: ' + req.session.views + '</p>');
  res.end();
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
