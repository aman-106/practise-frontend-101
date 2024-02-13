function detecDataTyepe(value) {
  let itsType = typeof value;
  if (itsType !== "object") {
    // function , undfiend , sting, symbol , number , boolean , bigint
    return itsType;
  } else if (itsType == "object" && !itsType) {
    return "null";
  } else if (Array.isArray(value)) {
    return "array";
  } else {
    return "object";
  }
}

function detectType(data) {
  if (data instanceof FileReader) return "object";
  return Object.prototype.toString
    .call(data)
    .slice(1, -1)
    .split(" ")[1]
    .toLowerCase();
}
x;
