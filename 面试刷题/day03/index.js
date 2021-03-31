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
  context = context || global;
  context.fn = this;
  delete context.fn(...args);
  return;
};

Function.prototype.$apply = function (context, args) {
  context.fn = this;
  delete context.fn(args);
  return;
};
// getName.bind(this)("1111111");
// getName.$call(null, 11, 234);
getName.$apply(zhangsan, [11, 234]);
