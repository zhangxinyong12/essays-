/**
 * 1. new Promise时，需要传递一个executor执行器，执行器立即执行
 * 2. executor 接受两个参数,参数是函数，分别是resolve和reject
 * 3. promise 只能从pending到rejected，或者从pending到fulfilled
 * 4. promise 的状态一旦确认，就不会再改变
 * 5. promise都有then方法，then接收两个参数，分别是promise成功的回调onFulfilled，和promise失败的回调onRedjected
 * 6.如果调用then时，promise已经成功，则执行onFulfilled并将promise的值作为参数传递进去。
 *   如果promise已经失败那么执行onRejected，并讲promise失败的原因作为参数传递进去。
 *   如果promise的状态是pending，需要将onFulfilled和onRejected函数存放起来，等待状态确定后。再依次将对应的函数执行（发布订阅）
 * 7.then 的参数onFulfilled和onRejected可以缺省
 * 8.promise可以then多次，promise的then返回一个新的promise
 * 9.如果then返回的是一个结果，那么就会把这个结果作为参数，传递给下一个then的成功回调（onFulfilled）
 * 10.如果then中抛出异常没那么就会把异常作为参数传递给下一个then的失败回调（onRejected）
 * 11.如果then返回的是一个promise，那么会等这个promise执行完，promise成功就会走下一个then的成功，
 *    如果失败就走下一个then的失败
 */

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function resolvePromise(promise2, x, resolve, reject) {
  // 循环引用报错
  if (x === promise2) {
    return reject(new TypeError("Chaining cycle detected for promise"));
  }
  // 防止多次调用
  let called;
  // x不是null且x是对象或者函数
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    try {
      // A+规定，声明then=x的then方法
      let then = x.then;
      if (typeof then === "function") {
        // 就让then执行第一个参数this 后面是成功的回调和失败的回调
        then.call(
          x,
          (y) => {
            // 成功 失败只能调用一个
            if (called) {
              return;
            }
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (err) => {
            if (called) {
              return;
            }
            called = true;
            reject(err);
          }
        );
      } else {
        resolve(x); // 直接成功即可
      }
    } catch (error) {
      // 也属于失败
      if (called) {
        return;
      }
      called = true;
      reject(error);
    }
  } else {
    resolve(x);
  }
}

class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.value = "";
    this.reason = "";
    this.onResolvedCallbacks = []; // 成功的
    this.onRejectedCallbacks = []; // 失败的
    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        // pending -> fulfilled 按照成功的执行清单执行
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onFulfilled, onRejected) {
    // onFulfilled不是函数，就忽略onFulfilled 直接返回value
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    // onRejected 如果不是函数就忽略onRejected 抛出错误
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };
    const promise2 = new Promise((resolve, reject) => {
      if (this.status === FULFILLED) {
        // 异步解决：onRejected 返回一个普通的值，失败时如果直接等于value=>value,则会跑到下一个then中的onFulfilled中
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });
    return promise2;
  }
}

// 测试使用promise
new Promise((resolve, reject) => {
  setTimeout(() => {
    const n = Math.random();
    if (n > 0.5) {
      resolve("resolve 结果:" + n);
    } else {
      reject("reject 结果:" + n);
    }
  }, 3000);
})
  .then(
    (res) => {},
    (err) => {
      console.log("err:", err);
      return new Promise((resolve, reject) => {
        console.log(2);
        setTimeout(() => {
          reject(3);
        }, 3000);
      });
    }
  )
  .then(
    (res) => {
      console.log("then.then", res);
    },
    (err) => {
      console.log("then.err:", err);
    }
  );
