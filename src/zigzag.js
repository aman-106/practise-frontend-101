const lettersArray = [
  ["E", "P", "P", "O", "U"],
  ["J", "F", "Q", "O", "J"],
  ["Q", "X", "A", "T", "P"],
];

// Your are given a 2-D array of characters. There is a hidden message in it.

// I B C A L K A
// D R F C A E A
// G H O E L A D
// The way to collect the message is as follows

// start at top left
// move diagonally down right
// when cannot move any more, try to switch to diagonally up right
// when cannot move any more, try switch to diagonally down right, repeat 3
// stop when cannot neither move down right or up right. the character on the path is the message
// for the input above, IROCLED should be returned.

function zizaf(arr) {
  const rows = arr.length;
  const columns = arr[0].length;

  let i = 0;
  let j = 0;
  while (true) {
    if (i === rows - 1 && j == columns - 1) {
      break;
    }
    while (i < rows && j < columns) {
      console.log(arr[i][j]);
      i++;
      j++;
    }
    while (i > 0 && j > 0) {
      console.log(arr[i][j]);
      i--;
      j--;
    }
  }
}

function peinterer(arr) {
  const rows = arr.length;
  const columns = arr[0].length;
  for (let i = 0; i < columns; i++) {
    let row = 1;
    let down = true;
    debugger;
    if (row % rows == 0) {
      down = !down;
    }
    row = down ? row + 1 : row - 1;
    if (i == columns - 1) {
      break;
    }

    console.log(arr[row - 1][i]);
  }
}

peinterer(lettersArray);
