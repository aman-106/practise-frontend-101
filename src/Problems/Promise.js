const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});

PrmoiseAll([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});

// https://bigfrontend.dev/problem/implement-Promise-all
// https://stackoverflow.com/questions/32536049/do-i-need-to-return-after-early-resolve-reject

// The return purpose is to terminate the execution of the function after the rejection,
//  and prevent the execution of the code after it.

function PrmoiseAll(arr = []) {
  if (!arr) {
    throw new TypeError("arr not defined");
  }
  if (arr.length == 0) {
    Promise.resolve(arr);
    return;
  }
  return new Promise((resolve, reject) => {
    const res = new Array(arr.length);
    let counter = 0;
    arr.forEach((promise, i) => {
      Promise.resolve(promise)
        .then((data) => {
          res[i] = data;
          counter++;
          // all have resolved
          if (counter === arr.length) {
            resolve(res);
          }
        })
        .catch(reject);
    });
  });
}

// Promise.allSettled() waits for all promises to settle.
function allSettled(arr) {
  if (!arr) {
    throw new TypeError("arr not defined");
  }
  if (arr.length == 0) {
    return Promise.resolve(arr);
  }
  return new Promise((resolve, reject) => {
    const res = new Array(arr.length);
    let counter = 0;
    arr.forEach((promise, i) => {
      Promise.resolve(promise)
        .then((data) => {
          res[i] = Promise.resolve(data);
        })
        .catch((err) => {
          res[i] = Promise.resolve(err);
        })
        .finally(() => {
          counter++;
          // all have resolved
          if (counter === arr.length) {
            resolve(res);
          }
        });
    });
  });
}

class MyPromise2 {
  constructor(callback) {
    this.callback = callback;
    this.onThen = this.onThen.bind(this);
    this.onCatch = this.onCatch.bind(this);
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    this.then = this.then.bind(this);
    this.catch = this.catch.bind(this);
    this.thenable = [];
    this.catchable = [];

    // init
    this.val = null;
    this.state = State.pending;
    this.callback(this.resolve, this.reject);
  }

  resolve(x) {
    // x
    this.val = val;
    this.state = State.done;

    this.onThen(x);
  }

  reject(x) {
    //
    this.val = val;
    this.state = State.error;

    this.onCatch(x);
  }

  onThen(x) {
    let input = x;
    while (this.thenable.length) {
      const fn = this.thenable.shift();
      try {
        input = fn(input);
      } catch (e) {
        this.onCatch(e);
      }
    }
  }

  onCatch(e) {
    let input = e;
    const fn = this.catchable.shift();
    try {
      input = fn(input);
    } catch (e) {
      this.onCatch(e);
    }
  }

  then(sCallable, eCallable) {
    // new MyPromise2()
    // this.thenable.push(callback);
    // return this;

    return new MyPromise2((resolve, reject) => {
      const sucessCaller = () => {
        if (!sCallable) return resolve(this.val);
        try {
          let val = sCallable(this.val);
          resolve(val);
        } catch (e) {
          reject(e);
        }
      };

      const errorCaller = () => {
        if (!eCallable) return reject(this.val);
        try {
          let val = eCallable(this.val);
          resolve(val);
        } catch (e) {
          reject(e);
        }
      };

      switch (this.state) {
        case State.pending:
          this.thenable.push(sCallable);
          this.catchable.push(eCallable);
          break;
        case State.done:
          sCallable();
          break;
        case State.error:
          eCallable(this.val);
          break;
        default:
          throw new Error("sk");
      }
    });
  }

  catch(callback) {
    // this.catchable.push(callback);
    // return this;
    return this.then(null, callback);
  }
}
