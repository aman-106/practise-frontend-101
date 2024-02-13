/**
 * @param {number[]} arr - ascending unique array
 * @param {number} target
 * @return {number}
 */
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor(left + right) / 2;

    if (arr[mid] === target) {
      return mid;
    }
    if (arr[mid] < target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return -1;
}

//   search last index with Binary Search(possible duplicate array)
/**
 * @param {number[]} arr - ascending array with duplicates
 * @param {number} target
 * @return {number}
 */
function lastIndex(arr, target) {
  // your code here
  let start = 0,
    end = arr.length - 1;
  while (start < end) {
    const mid = start + Math.floor((end - start) / 2);

    if (arr[mid] === target) {
      if (arr[mid + 1] !== target) return mid;
      start = mid + 1;
    } else if (arr[mid] < target) start = mid + 1;
    else end = mid - 1;
  }
  return arr[start] === target ? start : -1;
}
