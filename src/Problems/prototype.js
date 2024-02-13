// Function.prototype.call is very useful when we want to alter the this of a function.

// Can you implement your own myCall, which returns the same result as Function.prototype.call?

// For the newest ECMAScript spec, thisArg are not transformed. And not replaced with window in Strict Mode.

// Your implementation should follow above spec and do what non Strict Mode does.

// Function.prototype.call/apply/bind and Reflect.apply should not be used.

Function.prototype.mycall = function (thisArg, ...args) {
  // your code here
  //   return function djdj(){
  //     this = thisArg;
  //     return Function.prototype.constructor(...args)
  //   }

  // this binded to calle
  if (thisArg != "object") {
    throw new Error();
  }
  if (this.prototype && this.prototype.contructor) {
    // function check
    throw new Error();
  }
  const context = {
    ...thisArg,
    caller: this.prototype.contructor,
  };

  return context.caller(...args);
};

function greet() {
  console.log(this.animal, "typically sleep between", this.sleepDuration);
}

const obj = {
  animal: "cats",
  sleepDuration: "12 and 16 hours",
};

greet.call(obj); // cats typically sleep between 12 and 16 hours

greet.mycall(obj);

// Function.prototype.call(this, args);
