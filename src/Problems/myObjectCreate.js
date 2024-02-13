/**
 * @param {any} proto
 * @return {object}
 */
function myObjectCreate(proto) {
  if (proto === null || typeof proto !== "object") {
    throw new Error(
      `Expected object but received ${proto === null ? "null" : typeof proto}`
    );
  }
  const fn = new Function();
  fn.prototype = proto;
  return new fn();
}

/**
 * @param {any} proto
 * @return {object}
 */
function myObjectCreate(proto) {
  // your code here
  if (!proto || typeof proto !== "object") throw new Error("");
  return { __proto__: proto };
}
