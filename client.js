var FileCookieStore = require('tough-cookie-filestore');
var requestPromise = require('request-promise');
var rp = requestPromise.defaults({
  strictSSL: false, // allow us to use our self-signed cert for testing
  rejectUnauthorized: false,
  jar: requestPromise.jar(new FileCookieStore('cookies.json'))
});

function requestPage(previousResponse) {
  var referer = previousResponse ? previousResponse.headers.referer : null;
  if (previousResponse) {
    console.log('previous response referer "%s"', referer);
  }

  return rp({
    url: 'https://localhost:3000/',
    resolveWithFullResponse: true,
    headers: {
      referer: referer
    }
  });
}

requestPage()
  .then(function (response) {
    console.log(response.body);
    return requestPage(response);
  })
  .then(function (response) {
    console.log(response.body);
    return requestPage(response);
  })
  .catch(console.error);
