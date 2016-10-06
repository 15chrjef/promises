/**
 * Implement these functions following the node style callback pattern
 */
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var fs = require('fs');
var request = require('request');
var xhr = new XMLHttpRequest();
// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, cb) {
  // TODO
  return fs.readFile(filePath, 'utf8', function(err, results) {
    if (err) {
      cb(err);
      return;
    }
    var firstLine = results.split('\n')[0];
    cb(err, firstLine);
  });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  
  console.log('UNSENT', xhr.status);

  xhr.open('GET', url, true);
  console.log('OPENED', xhr.status);
  // xhr.onreadystatechange = function(event) {
  //   // console.log(xhr.responseText, xhr.response);
  //   if (xhr.status === 200) {
  //     callback(xhr.statusText, xhr.responseText);
  //   } else {
  //     callback(xhr.statusText);
  //   }
  // };
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log('hello 200', xhr.status);
      callback(undefined, xhr.status);
      return;
    } 
  };
  xhr.onerror = function() {
    var err = {};
    err.message = 'Invalid URI';
    callback(err);
  };
  // if (xhr.status !== 200) {
  //   console.log('failed',xhr.status)
  //   callback(err);
  // }
  xhr.setRequestHeader('Content-type', 'text/html');
  xhr.send();

  // TODO
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