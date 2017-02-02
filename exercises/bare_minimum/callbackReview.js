/**
 * Implement these functions following the node style callback pattern
 */






var fs = require('fs');
var request = require('request');
var http = require('http');
var url = require('url')
// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, cb) {
  // TODO
  fs.readFile(filePath, 'utf-8', function(err, text) {
    if (err) {
      cb(err, null);
    }
    text = text.slice(0, text.indexOf('\n'));
    cb(null, text);
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  request(url, function(err, data) {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, data.statusCode);
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
// fs.readFile(__dirname + '/README.md', 'utf8'
//   console.log('Example from callbackReview.js')
//   if (err) {
//     console.log('fs.readFile failed :(\n', err)
//   } else {
//     console.log('fs.readFile successfully completed :)\n', content)
//   }
// });