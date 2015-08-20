var FileCookieStore = require('tough-cookie-filestore');
var requestPromise = require('request-promise');
var rp = requestPromise.defaults({
  jar: requestPromise.jar(new FileCookieStore('cookies.json'))
});

function requestPage() {
  return rp('http://localhost:3000/');
}

requestPage()
  .then(console.dir)
  .then(requestPage)
  .then(console.dir)
  .then(requestPage)
  .then(console.dir)
  .catch(console.error);
