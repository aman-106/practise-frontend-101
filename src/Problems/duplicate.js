/**
 * @param {any[]} arr
 */
function deduplicate(arr) {
  arr.sort();
  let writer = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) arr[writer++] = arr[i];
  }

  for (let j = arr.length - 1; j > writer; j--) arr.pop();
}

function deduplicate(arr) {
  const obj = new Map();
  let i = 0;
  while (i < arr.length) {
    if (obj.has(arr[i])) arr.splice(i, 1);
    else {
      obj.set(arr[i], true);
      i++;
    }
  }

  return arr;
}
