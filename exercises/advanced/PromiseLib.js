// You should only use the `new Promise` constructor from bluebird
var Promise = require('bluebird');

/**
 * Return a function that wraps `nodeStyleFn`. When the returned function is invoked,
 * it will return a promise which will be resolved or rejected, depending on 
 * the execution of the now-wrapped `nodeStyleFn`
 *
 * In other words:
 *   - If `nodeStyleFn` succeeds, the promise should be resolved with its results
 *   - If nodeStyleFn fails, the promise should be rejected with the error
 *
 * Because the returned function returns a promise, it does and should not
 * expect a callback function as one of its arguments
 */

var promisify = function(nodeStyleFn) {
  var original = nodeStyleFn;
  var nodeStyleFn = function() {
    return new Promise((resolve, reject) => {
      return original.call(this, ...arguments, (err, data) => {
        if(err) { 
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }
  return nodeStyleFn;
};

// var original = callback;
// callback = function() {
//     // Do something with arguments:
//     console.log(arguments);
//     return original.apply(this, arguments);
// };

/**
 * Given an array which contains promises, return a promise that is
 * resolved if and when all the items in the array are resolved.
 *
 * The promise's resolve value should be an array that maps to the
 * respective positions in the original array of promises.
 *
 * If any promise in the array rejects, the returned promise
 * is rejected with the rejection reason.
 */

var all = function(arrayOfPromises) {
  var arr = [];
  var counter = 0;
  return new Promise((resolve, reject) => {
    arrayOfPromises.forEach((promise, i) => {
      promise
      .then(data => {
        arr[i] = data;
        counter ++;
        if (counter === arrayOfPromises.length) {
          resolve(arr);
        }
      })
      .catch(err => reject(err));
    });
  })
};


/**
 * Given an array of promises, return a promise that is resolved or rejected,
 * resolving with whatever the resolved value or rejection reason was from
 * the first to be resolved/rejected promise in the passed-in array
 */

var race = function(arrayOfPromises) {
  // TODO
  var complete = false;
  return new Promise((resolve, reject) => {
    arrayOfPromises.forEach(promise => {
      promise
      .then(data => {
        if (!complete){
          complete = !complete;
          resolve(data);
        }
      })
      .catch(err => {
        if (!complete) {
          complete = !complete;
          reject(err);
        }
      })
    });
  });
};

// Export these functions so we can unit test them
module.exports = {
  all: all,
  race: race,
  promisify: promisify
};
