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

class Promise {
  constructor(executor) {
    console.log("new Promise:", executor.toString());
    this.status = PENDING;
    this.value = "";
    this.reason = "";
    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
      }
    };
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onFufilled = () => {}, onRejected = () => {}) {
    if (this.status === FULFILLED) {
      onFufilled(this.value);
    }
    if (this.status === REJECTED) {
      onRejected(this.reason);
    }
  }
}

// 测试使用promise
new Promise((resolve, reject) => {
  console.log("before resolve");
  if (Math.random() > 0.5) {
    resolve("resolve 结果");
  } else {
    reject("reject 结果");
  }
}).then(
  (res) => {
    console.log("then res:", res);
  },
  (err) => {
    console.log("err:", err);
  }
);
