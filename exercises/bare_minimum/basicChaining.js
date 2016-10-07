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



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
 fs.readFile(__dirname + readFilePath, function(err,data){
  console.log(data)
 }).then( request('https://api.github.com', function(err,data){
  if(err){
    console.log(err)
  } else{
    console.log(data)
  }
 })).catch( console.log('err'))
    .finally()

};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
