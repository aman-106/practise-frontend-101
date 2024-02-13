// new operator is used to create new instance objects.

// Do you know exactly what new does?

// You are asked to implement myNew(), which should return an object just as what new does but without using new.

// Pay attention to the return type of constructor.

/**
 * @param {Function} constructor
 * @param {any[]} args - argument passed to the constructor
 * `myNew(constructor, ...args)` should return the same as `new constructor(...args)`
 */
const myNew = (constructor, ...args) => {
  // your code here

  const obj = Object.create(constructor);

  const functionInst = constructor.apply(obj, args);

  if (functionInst && functionInst != "object") {
    return functionInst;
  }

  return obj;
};
