// function SuperType(name) {
//   this.name = name;
//   this.forSuper = [1, 2];
//   this.from = "super";
// }
// SuperType.prototype.superMethod = function () {};
// SuperType.prototype.method = function () {};
// SuperType.staticSuper = "staticSuper";

// function SubType(name) {
//   this.name = name;
//   this.forSub = [3, 4];
//   this.from = "sub";
// }

// SubType.prototype.subMethod = function () {};
// SubType.prototype.method = function () {};
// SubType.staticSub = "staticSub";

// const InheritedSubType = myExtends(SuperType, SubType)

// const instance = new InheritedSubType()

// // above should work (almost) the same as follows

// class SubType extends SuperType {}
// const instance = new SubType()

const myExtends = (SuperType, SubType) => {
  function ExtendType(...args) {
    // When constructor funciton is called with new, `this` will be created as a new object automatically - new MyFunc()
    // When called without new, `this` points to whichever object that called this function - MyFunc,call(a), `this` points to `a`
    SuperType.call(this, ...args);
    SubType.call(this, ...args);

    // Either do this line below, or do ExtendType.prototype = SubType.prototype;
    // Object.setPrototypeOf(this, SubType.prototype); // or this.__proto__ = SubType.prototype;
  }

  // This line below assigns SubType.prototype to all instances of objects created with new ExtendType()
  ExtendType.prototype = SubType.prototype; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain

  // Setup link between SubType.prototype and SuperType.prototype
  Object.setPrototypeOf(SubType.prototype, SuperType.prototype); // SubType.prototype.__proto__ = SuperType.prototype;

  // Set up link between SuperType and SubType, so SuperType inherits SubType's static members
  Object.setPrototypeOf(SuperType, SubType); // SuperType.__proto__ = SubType;

  // Set up link betwen ExtendType and SuperType, so ExtendType inherits SuperType's static members
  Object.setPrototypeOf(ExtendType, SuperType); // ExtendType.__proto__ = SuperType;

  return ExtendType;
};
