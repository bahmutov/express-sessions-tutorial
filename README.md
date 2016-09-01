# express-sessions-tutorial

> Debugging ExpressJS sessions tutorial

[![Build status][ci-image]][ci-url]

You can run the code at different step, here are the tags

* `step-0` - the initial code without sessions.
* `step-1` - sessions in plain JSON files.
* `step-2` - counting views in a session.
* `step-3` - sending cookies from curl or [httpie](https://github.com/jkbrzt/httpie)
* `step-4` - session from a Node client.
* `step-5` - Express server running on HTTPS locally.
* `step-6` - updated code for connecting to self-signed HTTPS servers.
* `step-7` - passing Referer header from server's response to the next request
* `step-8` - protecting a form using CSRF attached to the session object
* `step-9` - protecting JSON POST request with CSRF header
* `step-10` - CSRF using cookie, not session

The tutorial itself is at [glebbahmutov.com/blog/express-sessions/](http://glebbahmutov.com/blog/express-sessions/).

### Small print

Author: Gleb Bahmutov &copy; 2015

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://glebbahmutov.com/blog/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet / open issue on Github

## MIT License

Copyright (c) 2015 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[ci-image]: https://travis-ci.org/bahmutov/express-sessions-tutorial.svg?branch=master
[ci-url]: https://travis-ci.org/bahmutov/express-sessions-tutorial
