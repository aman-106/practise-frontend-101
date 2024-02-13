function countSubstrings(s) {
  /**
   * Counts the total number of palindromic substrings in a given string.
   *
   * @param {string} s The string to be analyzed.
   * @return {number} The total number of palindromic substrings in the string.
   */

  const n = s.length;
  const dp = Array.from({ length: n }, () => Array(n).fill(false));
  let count = 0;

  for (let g = 0; g < n; g++) {
    for (let i = 0, j = g; j < n; i++, j++) {
      if (g === 0) {
        dp[i][j] = true;
      } else if (g === 1) {
        dp[i][j] = s[i] === s[j];
      } else {
        dp[i][j] = s[i] === s[j] && dp[i + 1][j - 1];
      }

      if (dp[i][j]) {
        count++;
      }
    }
  }

  return count;
}

// Example usage:
const s = "aaa";
const result = countSubstrings(s);
console.log(`The string '${s}' has ${result} palindromic substrings.`);
