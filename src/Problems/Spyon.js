// const obj = {
//     data: 1,
//     increment(num) {
//        this.data += num
//     }
//  }

//  const spy = spyOn(obj, 'increment')

//  obj.increment(1)

//  console.log(obj.data) // 2

//  obj.increment(2)

//  console.log(obj.data) // 4

//  console.log(spy.calls)
//  // [ [1], [2] ]

/**
 * @param {object} obj
 * @param {string} methodName
 */
function spyOn(obj, methodName) {
  if (!obj) {
    throw new Error("invalid args");
  }
  if (typeof obj[methodName] != "function") {
    throw Error("method missing");
  }

  const store = [];

  const oldfn = obj[methodName];
  obj[methodName] = function (...args) {
    store.push(args);
    return oldfn.apply(obj, args);
  };

  return {
    calls: store,
  };
}
