// Here One to One patten
class Observable {
  constructor(setup) {
    this._setup = setup;
  }

  subscribe(subscriber) {
    // equivalent to fire
    // a wrapper function/ object
    // is used to share the closure of outer function and modify the logics
    const subscriberWrapper = {
      unsubscribed: false,
      next(value) {
        if (this.unsubscribed) return;
        // we are relying on the scope of subscriber
        if (subscriber instanceof Function) return subscriber(value);
        return subscriber.next ? subscriber.next(value) : null;
      },
      error(value) {
        if (this.unsubscribed) return;
        this.unsubscribe();
        return subscriber.error ? subscriber.error(value) : null;
      },
      complete() {
        if (this.unsubscribed) return;
        this.unsubscribe();
        return subscriber.complete ? subscriber.complete() : null;
      },
      unsubscribe() {
        this.unsubscribed = true;
      },
    };
    this._setup(subscriberWrapper);
    return subscriberWrapper;
  }
}

// making observale from
/**
 * @param {Array | ArrayLike | Promise | Iterable | Observable} input
 * @return {Observable}
 */
function from(input) {
  if (input instanceof Observable) {
    return observableFromObservable(input);
  }
  if (input instanceof Promise) {
    return observableFromPromise(input);
  }
  if (Array.isArray(input) || typeof input[Symbol.iterator] === "function") {
    return observableFromIterable(input);
  }
  if ("length" in input) {
    return observableFromArrayLike(input);
  }
  throw new Error("Incorrect input type");
}

function observableFromObservable(input) {
  return new Observable((sub) => {
    input.subscribe(sub);
  });
}

function observableFromPromise(input) {
  return new Observable((sub) => {
    input
      .then(
        (val) => {
          sub.next(val);
        },
        (err) => {
          sub.error(err);
        }
      )
      .then(() => {
        sub.complete();
      });
  });
}

function observableFromIterable(input) {
  return new Observable((sub) => {
    try {
      for (let el of input) {
        sub.next(el);
      }
    } catch (err) {
      sub.error(err);
    }
    sub.complete();
  });
}

function observableFromArrayLike(input) {
  return new Observable((sub) => {
    try {
      for (let i = 0; i < input.length; i++) {
        sub.next(input[i]);
      }
    } catch (err) {
      sub.error(err);
    }
    sub.complete();
  });
}

// multi cast

// const subject = new Subject()
// subject.subscribe(console.log)
// subject.subscribe(console.log)

// const observable = from([1, 2, 3])
// observable.subscribe(subject)

class Subject {
  constructor(name) {
    this.name = name;
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return {
      uns: () => fileter(0),
    };
  }
}

class Observable {
  constructor(setup) {
    this._setup = setup;
  }

  subscribe(subscriber) {
    // equivalent to fire
    // a wrapper function/ object
    // is used to share the closure of outer function and modify the logics
    const subscriberWrapper = {
      unsubscribed: false,
      next(value) {
        if (this.unsubscribed) return;
        // we are relying on the scope of subscriber
        if (subscriber instanceof Function) return subscriber(value);
        return subscriber.next ? subscriber.next(value) : null;
      },
      error(value) {
        if (this.unsubscribed) return;
        this.unsubscribe();
        return subscriber.error ? subscriber.error(value) : null;
      },
      complete() {
        if (this.unsubscribed) return;
        this.unsubscribe();
        return subscriber.complete ? subscriber.complete() : null;
      },
      unsubscribe() {
        this.unsubscribed = true;
      },
    };
    this._setup(subscriberWrapper);
    return subscriberWrapper;
  }

  subscribeSubject(subject) {
    subject.listeners((listener) => this.subscribe(listener));
  }
}

// or;

class Subject {
  constructor() {
    this.subscribers = [];
  }
  subscribe(subscriber) {
    const sub = new Observer(subscriber);
    this.subscribers.push(sub);
    return {
      unsubscribe: () => {
        this.subscribers = this.subscribers.filter((s) => s !== sub);
      },
    };
  }
  next = (value) => {
    this.subscribers.forEach((subscriber) => {
      subscriber.next(value);
    });
  };
  error = (err) => {
    this.subscribers.forEach((subscriber) => {
      subscriber.error(err);
    });
  };
  complete = () => {
    this.subscribers.forEach((subscriber) => {
      subscriber.complete();
    });
  };
}

// interval(1000).subscribe(console.log);

function interval(tn) {
  return {
    sub: function () {
      let counter = 0;
      const x = Observable(setup);

      setInterval(() => {
        counter++;
        x.subcribe(() => counter);
      }, tn);
    },
  };
}

/**
 * @param {any} input
 * @return {(observable: Observable) => Observable}
 * returns a function which trasnform Observable
 */
function map(transform) {
  return function (observable) {
    return new Observable((outputObserver) => {
      observable.subscribe({
        next: (data) => outputObserver.next(transform(data)),
        error: (err) => outputObserver.error(err),
        complete: () => outputObserver.complete(),
      });
    });
  };
}
