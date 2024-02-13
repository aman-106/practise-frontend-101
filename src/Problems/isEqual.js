function isEqual(a, b, map = new Map()) {
  // map to hold for cicluar reference

  if (a === b) {
    return true;
  }

  if (typeof a != "object" || typeof b != "object") {
    return false;
  }

  if (map.has(a) && map.has(a) === b) {
    return true;
  }

  map.set(a, b);

  const keya = Object.keys(a);
  const keyb = Object.keys(b);

  if (keya.length != keyb.length) {
    return false;
  }

  for (let i = 0; i < keya.length; i++) {
    if (keya[i] != keyb[i] || !isEqual(a[keya[i]], b[keyb[i]], map)) {
      return false;
    }
  }

  return true;
}

// deep copy
function cloneDeep(obj, map = new Map()) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (map.has(obj)) {
    return map.get(obj);
  }

  const output = Array.isArray(obj) ? [] : {};
  map.set(obj, output);
  const keys = [...Object.getOwnPropertySymbols(obj), ...Object.keys(obj)];

  for (const key of keys) {
    const val = obj[key];
    output[key] = cloneDeep(val, map);
  }

  return output;
}
