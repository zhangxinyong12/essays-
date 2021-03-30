let arr = [];
const N = 1000000;
for (let i = 0; i < N; i++) {
  arr.push(Math.floor(Math.random() * 1000));
}
// 处理成排序
arr = Array.from(new Set(arr)).sort((a, b) => a - b);

// 查找 等于500的集合
let list = [];
// 普通遍历
console.time();
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === 500) {
    list.push(arr[i]);
  }
}
console.log("-----for 耗时-----------");
console.timeEnd();

// 数组 filter
list = null;
list = [];
console.time();
list = arr.filter((item) => item === 500);
console.log("------filter----------");
console.timeEnd();

// 使用二分查找
console.time();
list = null;
list = [];
function findN(arr, target) {
  let left = 0,
    right = arr.length - 1;
  while (left <= right) {
    const mn = Math.floor((left + right) / 2);
    if (target === arr[mn]) {
      list.push(arr[mn]);
      console.log(mn, list);
      return target;
    } else if (target < arr[mn]) {
      right = mn - 1;
    } else {
      left = mn + 1;
    }
  }
  return false;
}
findN(arr, 600);
console.log("------使用二分查找----------");
console.timeEnd();
// 0 1 2 3 4 5 6
