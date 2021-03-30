const search = function (nums, target) {
  let left = 0,
    right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (target < nums[mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return -1;
};

const nums = [],
  target = 9;

console.log(search(nums, target));
// 初始条件：left = 0, right = length-1
// 终止：left > right
// 向左查找：right = mid-1
// 向右查找：left = mid+1
console.log("******************x的平方根************************");
const mySqrt = function (x) {
  if (x < 2) return x;
  let left = 0,
    right = x - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const n = mid * mid;
    console.log(mid, n);
    if (n < x) {
      left = mid + 1;
    } else if (n > x) {
      right = mid - 1;
    } else {
      return mid;
    }
  }
  return right;
};

console.log(mySqrt(1024));
