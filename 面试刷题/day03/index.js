// call bind apply
const zhangsan = {
  name: "张三",
};

const lisi = {
  name: "李四",
};
global.name = "当前环境 global name";
function getName() {
  console.log(this.name);
  console.log(arguments);
}

Function.prototype.$call = function (context, ...args) {
  context = context;
  context.fn = this;
  delete context.fn(...args);
  return;
};

Function.prototype.$apply = function (context, args) {
  context.fn = this;
  delete context.fn(args);
  return;
};

Function.prototype.$bind = function (context) {
  if (typeof this !== "function") {
    throw new Error(
      "Function.prototype.bimd - what is tring to be bound is not callable"
    );
  }
  const slef = this;
  const args = Array.prototype.slice.call(arguments, 1);
  const fNOP = function () {};
  const fBound = function () {
    const bindArgs = Array.prototype.slice.call(arguments);
    return slef.apply(
      this instanceof fNOP ? this : context,
      args.concat(bindArgs)
    );
  };
  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
};

getName.bind(this)("1111111");
// getName.$call(null, 11, 234);
// getName.$apply(zhangsan, [11, 234]);
let arr = [];
var a = Object.prototype.toString.call(arr);
console.log(a);
