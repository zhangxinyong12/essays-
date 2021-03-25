const PENDING = "pending";
const FUIFILLED = "fufilled";
const REJECTED = "rejected";

class Promise {
  constructor(executor) {
    this.state = PENDING;
    this.value = "";
    this.onFufilledCallbacks = [];
    this.onRejectedCallbacks = [];
    console.log("constructor 000");
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }
  resolve(value) {
    if (this.state === PENDING) {
      this.state = FUIFILLED;
      this.value = value;
      console.log("resolve111111");
      this.onFufilledCallbacks.forEach((fn) => fn());
    }
  }
  reject(reason) {
    if (this.state === PENDING) {
      this.state = REJECTED;
      this.reason = reason;
      console.log("reject111111");

      this.onRejectedCallbacks.forEach((fn) => fn());
    }
  }
  then(onFufilled, onRejected) {
    onFufilled =
      typeof onFufilled === "function" ? onFufilled : (value) => value;
    onRejected = typeof onRejected === "function" ? onRejected : (err) => err;
    if (this.state === FUIFILLED) {
      try {
        onFufilled(this.value);
      } catch (error) {
        onRejected("00000");
      }
    }
    if (this.state === REJECTED) {
      try {
        console.log("进入 rejected");
        onRejected(this.reason);
      } catch (error) {
        throw error;
      }
    }
    if (this.state === PENDING) {
      console.log("then pending", onFufilled, onRejected);
      this.onFufilledCallbacks.push(() => onFufilled(this.value));
      this.onRejectedCallbacks.push(() => onRejected(this.reason));
    }
  }
}

new Promise((resolve, reject) => {
  const n = Math.random();
  console.log(1);
  setTimeout(() => {
    console.log(666666666);
    if (n > 0.5) {
      resolve(n);
    } else {
      reject(n);
    }
  }, 3000);
});
