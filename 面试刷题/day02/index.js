// 编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：
// 每行中的整数从左到右按升序排列。
// 每行的第一个整数大于前一行的最后一个整数。
// https://leetcode-cn.com/problems/search-a-2d-matrix/
// 输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
// 输出：true
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  let n = 0,
    m = matrix.length - 1;
  function find(arr, target) {
    let x = 0,
      y = arr.length - 1;
    function fn(arr, target) {
      if (arr[x] === target || arr[y] === target) {
        return true;
      }
      x++;
      y--;
      if (x > y) {
        return false;
      }
      return fn(arr, target);
    }
    return fn(arr, target);
  }
  function fn() {
    let a = matrix[n],
      a1 = a[0],
      a2 = a[a.length - 1],
      b = matrix[m],
      b1 = b[0],
      b2 = b[b.length - 1];

    if (a1 === target || a2 === target || b1 === target || b2 === target) {
      return true;
    }
    if (target > a1 && target < a2) {
      return find(a, target);
    } else if (target > b1 && target < b2) {
      return find(b, target);
    } else {
      n++;
      m--;
      if (n > m) {
        return false;
      }
      return fn();
    }
  }
  return fn();
};
var matrix = [
    [1, 3, 5, 7],
    [10, 11, 16, 20],
    [23, 30, 34, 60],
  ],
  target = 23;
// function searchMatrix(matrix, target) {
//   const arr = matrix.flat(Infinity);
//   return arr.includes(target);
// }
var f = searchMatrix(matrix, target);
console.log("f ", f);
