var rp = require('request-promise');

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
