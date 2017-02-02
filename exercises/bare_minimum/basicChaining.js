/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */
var request = require('request');
var fs = require('fs');
var Promise = require('bluebird');
var request = require('request');



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(readFilePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        var gitHubName = data.slice(0, data.indexOf('\n'));
        resolve(gitHubName);
      }
    });
  })
  .then((name) => {
    var options = {
      url: 'https://api.github.com/users/' + name,
      headers: { 'User-Agent': 'request' },
      json: true
    };
    var promise = new Promise((resolve, reject) => {
      request.get(options, function(err, res, body) {
        if (err) {
          reject(err);
        } else if (body.message) {
          reject(body.message);
        } else {
          resolve(JSON.stringify(body));
        }
      });
    });
    return promise;
  })
  .then(body => {
    return new Promise((resolve, reject) => {
      fs.writeFile(writeFilePath, body, 'utf-8', function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  })
  .catch(err => err);
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
