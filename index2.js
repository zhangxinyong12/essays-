function fibonacci(n) {
  if (n <= 1) {
    return 1;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(4));

setTimeout(() => {
  console.log("1");
});
new Promise((resolve) => {
  console.log(2);
  resolve();
}).then(() => {
  console.log(3);
});
console.log(4);

console.log("---------");
// 5、请用javascript写出一个简单的闭包
function add(num) {
  return function (toAdd) {
    return num + toAdd;
  };
}

console.log("add", add(1)(3));
console.log("add", add(4)(2));
// 6、封装一个函数实现延迟调用，参数是定时器的时间，.then执行回调函数。
const $setTime = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

$setTime(3000).then(() => {
  console.log("000000000000");
});
//7、通过display: none 和 visibility: hidden 来实现浏览器元素的隐藏有什么区别？
// display: none;元素不存在DOM结构中；visibility: hidden 元素还在DOM结构中。只是不可见

// 8、mouseenter和mouseover的区别
// mouseenter 鼠标进入
// mouseover 鼠标经过

// 9、请用js实现bind函数
Function.prototype.$bind = function (obj) {
  return (...args) => this.apply(obj, args);
};

const a = {
  name: "name_a",
  getName: function () {
    console.log("a name", this.name);
  },
};

const b = {
  name: "name_b",
};
a.getName.$bind(b)();

// 10
async function Req() {
  const data = await Promise.all([fetch("req1"), fetch("req2"), fetch("req3")]);
  // task1
  fetch("req4")
    .then((res) => res.json())
    .then(() => {
      // task2
    });
}

// 2 矩阵清零
const list1 = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];

const list2 = [
  [0, 1, 2, 0],
  [3, 4, 5, 2],
  [1, 3, 1, 5],
];
const list3 = [
  [1, 1, 1, 1],
  [1, 1, 0, 1],
  [1, 0, 1, 1],
];
function setZeroes(matrix) {
  const arr = []; // 存放位置 {x,y}
  matrix.forEach((el, i) => {
    el.forEach((item, index) => {
      if (item === 0) {
        arr.push({ x: i, y: index });
      }
    });
  });
  arr.forEach((el) => {
    matrix[el.x] = matrix[el.x].map(() => 0);
    matrix.forEach((items) => {
      items[el.y] = 0;
    });
  });
}

setZeroes(list2);

console.log("list2", list2);

var arr = [1, 2, 34, 4];
arr = new Array(arr.length).fill(0);

console.log("arr", arr);
