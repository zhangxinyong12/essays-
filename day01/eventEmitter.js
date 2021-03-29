/**
 * 
    发布-订阅模式其实是一种对象间一对多的依赖关系，当一个对象的状态发送改变时，所有依赖于它的对象都将得到状态改变的通知。
    订阅者（Subscriber）把自己想订阅的事件注册（Subscribe）到调度中心（Event Channel），
    当发布者（Publisher）发布该事件（Publish Event）到调度中心，
    也就是该事件触发时，由调度中心统一调度（Fire Event）订阅者注册到调度中心的处理代码。
 */

const { once, eventNames } = require("_commander@4.1.1@commander");

const eventEmitter = {};

// 缓存列表，存放event及fn
eventEmitter.list = {};

// 订阅
eventEmitter.on = function (event, fn) {
  const _this = this;
  if (!_this.list[event]) {
    _this.list[event] = [];
  }
  _this.list[event].push(fn);
  return _this;
};

// 监听一次
eventEmitter.once = function (event, fn) {
  const _this = this;
  function on() {
    _this.off(event, on);
    fn.apply(_this, arguments);
  }

  on.fn = fn;
  console.log("on", on.fn.toString());

  _this.on(event, on);
  return _this;
};

// 取消订阅
eventEmitter.off = function (event, fn) {
  const _this = this;
  let fns = _this.list[event];
  if (!fns) {
    return false;
  }
  if (!fn) {
    fns = [];
  } else {
    let cb;
    for (let i = 0, cbLen = fns.length; i < cbLen; i++) {
      cb = fns[i];
      if (cb === fn || cb.fn === fn) {
        fns.splice(i, 1);
        break;
      }
    }
  }
  return _this;
};

// 发布
eventEmitter.emit = function () {
  const _this = this;
  const event = [].shift.call(arguments);
  const fns = [..._this.list[event]];
  if (!fns || fns.length === 0) {
    return false;
  }
  fns.forEach((fn) => {
    fn.apply(_this, arguments);
  });
  return _this;
};

// 测试demo

function fn1(a) {
  console.log("用户订阅fn1", a);
}

function fn2(a) {
  console.log("用户订阅fn2", a);
}

// eventEmitter.on("test1", fn1);
// eventEmitter.on("test1", fn1);
// eventEmitter.on("test1", fn1);

// eventEmitter.on("test2", fn2);
// eventEmitter.on("test2", fn2);
// eventEmitter.on("test2", fn2);

eventEmitter.once("test2", fn2);

eventEmitter.emit("test2", { a: "aaaaaa1111" });
