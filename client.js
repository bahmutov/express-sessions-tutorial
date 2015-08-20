var FileCookieStore = require('tough-cookie-filestore');
var requestPromise = require('request-promise');
var rp = requestPromise.defaults({
  strictSSL: false, // allow us to use our self-signed cert for testing
  rejectUnauthorized: false,
  jar: requestPromise.jar(new FileCookieStore('cookies.json'))
});

function requestPage() {
  return rp('https://localhost:3000/');
}

requestPage()
  .then(console.dir)
  .then(requestPage)
  .then(console.dir)
  .then(requestPage)
  .then(console.dir)
  .catch(console.error);
