// type Callback = (error: Error, data: any) => void

// type AsyncFunc = (
//    callback: Callback,
//    data: any
// ) => void
// Your parallel() should accept AsyncFunc array, and return a new function which triggers its own callback when all async functions are done or an error occurs.

// Suppose we have an 3 async functions

// const async1 = (callback) => {
//    callback(undefined, 1)
// }

// const async2 = (callback) => {
//    callback(undefined, 2)
// }

// const async3 = (callback) => {
//    callback(undefined, 3)
// }
// Your parallel() should be able to accomplish this

// const all = parallel(
//   [
//     async1,
//     async2,
//     async3
//   ]
// )

// all((error, data) => {
//    console.log(data) // [1, 2, 3]
// }, 1)

/*
type Callback = (error: Error, data: any) => void

type AsyncFunc = (
   callback: Callback,
   data: any
) => void

*/

/**
 * @param {AsyncFunc[]} funcs
 * @return {(callback: Callback) => void}
 */
function parallel(funcs) {
  const promiseArr = funcs.map(promisefy);

  return function (callback, init) {
    return Promise.all(promiseArr.map((p) => p(init)))
      .then((data) => callback(null, data))
      .catch(callback);
  };
}

function promisefy(func) {
  return function (init) {
    return new Promise((resolve, rejcet) => {
      func((err, data) => {
        if (err) {
          rejcet(err);
        }

        resolve(data);
      }, init);
    });
  };
}
// Your parallel() should accept AsyncFunc array,
// and return a new function which triggers its own callback
// when all async functions are done or an error occurs.

function parallel2(funcs) {
  let counter = 0;
  function callback(cb, counter) {
    if (err) {
      cb(err);
    }
    counter++;
    if (counter === funcs.length) {
      cb(null, data);
    }
  }

  return function all(cb, initialValue) {
    return funcs.map(func(callback(cb, counter), initialValue));
  };
}

function race(funcs) {
  let counter = false;
  function callback(cb) {
    if (counter) {
      return;
    }
    if (err) {
      cb(err);
    }
    counter = true;
    if (counter) {
      cb(null, data);
    }
  }

  return function all(cb, initialValue) {
    return funcs.map(func(callback(cb), initialValue));
  };
}
