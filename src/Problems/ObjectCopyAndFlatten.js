function objectAssign(target, ...sources) {
  if (target === null || target === undefined) {
    throw new Error("not an object");
  }

  if (typeof target !== "object") {
    target = Object(target);
  }

  for (let source of sources) {
    if (source !== null && source !== undefined) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    }
  }
  return target;
}

function Flatten(obj) {
  let copy = {};

  const stack = [obj];
  while (stack.length) {
    const object = stack.pop();
    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        const element = object[key];
        if (typeof element === "object") {
          stack.push(element);
        } else {
          copy[key] = element;
        }
      }
    }
  }

  return copy;
}

console.log(
  deepcopY({
    a: 10,
    b: {
      c: 11,
      d: {
        G: 12,
      },
    },
  })
);
