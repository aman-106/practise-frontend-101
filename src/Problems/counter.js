// const counter = createCounter()
// counter.count // 0, then it should increment
// counter.count // 1
// counter.count // 2
// counter.count = 100 // it cannot be altered
// counter.count // 3

// writable , get and set cannot used in together

function createCounter() {
  // your code here

  let count = 0;
  const counter = {};
  Object.defineProperty(counter, "count", {
    get() {
      return count++;
    },
    set() {
      throw Error();
    },
    enumerable: false,
    configurable: true,
  });

  return counter;
}
