/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */
var fs = require('fs');
var Promise = require('bluebird');

var combineFirstLineOfManyFiles = function(filePaths, writePath) {
 // TODO
  return Promise.all(filePaths)
  .then((paths) => {
    var files = [];
    var counter = 0;
    paths.forEach( (path, i) => {
      fs.readFile(path, 'utf-8', (err, data) => {
        if (data) {
          var firstLine = data.slice(0, data.indexOf('\n'));
          files[i] = firstLine;
          counter++;
        }
        if (counter === filePaths.length) {
          var newString = files.join('\n');
          fs.writeFile(writePath, newString);
        }
      });
    });
  });
  // .then(data => console.log('datadatadatadata', data))
};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};