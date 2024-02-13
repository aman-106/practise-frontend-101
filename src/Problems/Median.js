// median([1,2],[3,4,5])
// // 3
// If there are even numbers, return the average.

// median([1,2],[3,4])
// // 2.5

function median(arr1, arr2) {
  const len = arr1.length + arr2.length;
  const arr = new Array(arr1.length + arr2.length);
  const odd = len % 2 != 0;
  const med = Math.ceil(len / 2);
  let k = 0,
    i = 0,
    j = 0;
  while (k < len || k <= med) {
    if (i >= arr1.length) {
      arr[k] = arr2[j];
      k++;
      j++;
    } else if (j >= arr2.length) {
      arr[k] = arr1[i];
      k++;
      i++;
    } else {
      if (arr1[i] > arr2[j]) {
        arr[k] = arr2[j];
        k++;
        j++;
      } else if (arr1[i] < arr2[j]) {
        arr[k] = arr1[i];
        k++;
        i++;
      } else {
        // eq
        arr[k] = arr1[i];
        k++;
        arr[k] = arr2[j];
        k++;
        i++;
        j++;
      }
    }
  }

  if (odd) {
    return arr[med - 1];
  } else {
    return (arr[med - 1] + arr[med]) / 2;
  }
}

// optmiize by just getting median number instead of sorted array
