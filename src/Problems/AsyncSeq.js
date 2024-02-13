function seq2(funcs) {
  const qeue = [...funcs];

  function callbackWrapper(callback, qeue) {
    return (err, data) => {
      if (err) {
        callback(err);
      }
      // callback(null,data)
      if (qeue.length) {
        const next = qeue.shift();
        next(callbackWrapper(callback, qeue), data);
      } else {
        callback(null, data);
      }
    };
  }

  return function (callback, init) {
    return callbackWrapper(callback, qeue)(null, init);
  };
}

const asyncTimes2 = (callback, num) => {
  setTimeout(() => {
    callback(null, num * 2);
  }, 100);
};

const asyncTimes4 = seq2([asyncTimes2, asyncTimes2]);

asyncTimes4((error, data) => {
  console.log(data); // 4
}, 1);

// or

// /**
//  * @param {AsyncFunc[]} funcs
//  * @return {(callback: Callback) => void}
//  */
function sequence(funcs) {
  const pros = func.map(promosify);

  return function (callback, input) {
    let c = Promise.resolve(input);

    pros.forEach((pro) => {
      c.then(pro);
    });

    c.then((data) => callback(null, data)).catch(callback);
  };
}

function promosify(func) {
  return function (input) {
    return new Promise((resolve, reject) => {
      func((err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      }, input);
    });
  };
}
