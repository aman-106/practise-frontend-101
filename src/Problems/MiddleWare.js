// Middleware functions are functions with fixed interface that could be chained up like following two functions.

// app.use('/user/:id', function (req, res, next) {
//   next()
// }, function (req, res, next) {
//   next(new Error('sth wrong'))
// })
// You are asked to create simplified Middleware system:

// type Request = object

// type NextFunc =  (error?: any) => void

// type MiddlewareFunc =
//   (req: Request, next: NextFunc) => void

// type ErrorHandler =
//   (error: Error, req: Request, next: NextFunc) => void

// class Middleware {
//   use(func: MiddlewareFunc | ErrorHandler) {
//     // do any async operations
//     // call next() to trigger next function
//   }
//   start(req: Request) {
//     // trigger all functions with a req object
//   }
// }
// Now we can do something similar with Express

// Notice that use() could also accept an ErrorHandler which has 3 arguments. The error handler is triggered if next() is called with an extra argument or uncaught error happens, like following.

// const middleware = new Middleware()

// // throw an error at first function
// middleware.use((req, next) => {
//    req.a = 1
//    throw new Error('sth wrong')
//    // or `next(new Error('sth wrong'))`
// })

// // since error occurs, this is skipped
// middleware.use((req, next) => {
//    req.b = 2
// })

// // since error occurs, this is skipped
// middleware.use((req, next) => {
//    console.log(req)
// })

// // since error occurs, this is called
// middleware.use((error, req, next) => {
//    console.log(error)
//    console.log(req)
// })

// middleware.start({})
// // Error: sth wrong
// // {a: 1}

// type Request = object;

// type NextFunc = (error?: any) => void;

// type MiddlewareFunc = (req: Request, next: NextFunc) => void;

// type ErrorHandler = (error: Error, req: Request, next: NextFunc) => void;

const middleware = new Middleware();

middleware.use((req, next) => {
  req.a = 1;
  next();
});

middleware.use((req, next) => {
  req.b = 2;
  next();
});

middleware.use((req, next) => {
  console.log(req);
});

middleware.start({});
// {a: 1, b: 2}

class Middleware {
  /**
   * @param {MiddlewareFunc} func
   */
  constructor() {
    this.sucessQueue = [];
    this.errorQueue = [];
  }

  use(func) {
    // func: MiddlewareFunc | ErrorHandler;
    if (func.length == 2) {
      this.sucessQueue.push(func);
    } else if (func.length == 3) {
      this.errorQueue.push(func);
    } else {
      throw Error("invalid func");
    }
  }

  /**
   * @param {Request} req
   */

  errorhandler = (error) => {
    if (this.errorQueue.length) {
      const current = this.errorQueue.pop();
      current(error, this.req, this.nexthandler);
    } else {
      throw err;
    }
  };

  nexthandler = (error) => {
    try {
      if (error) {
        this.errorhandler();
      } else {
        if (this.sucessQueue.length) {
          const current = this.sucessQueue.shift();
          current(this.req, this.nexthandler);
        }
      }
    } catch (err) {
      this.errorhandler(err);
    }
  };

  start = (req) => {
    try {
      this.req = req;
      if (this.sucessQueue.length) {
        const nextUse = this.sucessQueue.shift();
        nextUse(this.req, this.nexthandler);
      }
    } catch (err) {}
  };
}
