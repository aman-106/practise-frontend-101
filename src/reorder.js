const A = ["A", "B", "C", "D", "E", "F"];
const B = [1, 5, 4, 3, 2, 0];

// x = B[("A", "A", "C", "D", "E", "F")][("A", "A", "C", "D", "E", "B")];
// x = f[("F", "A", "E", "D", "C", "B")];
// x = A;

["A", "B", "C", "D", "E", "F"][(1, 5, 4, 3, 2, 0)];

// O(1)
function reorder() {
  for (let index = 0; index < A.length; index++) {
    const elemIndx = B.indexOf(index);
    temp = A[idx];
    A[idx] = A[elemIndx];
    A[elemIndx] = temp;

    B[elemIndx] = B[index];
    B[index] = index;
  }
}
