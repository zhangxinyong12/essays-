const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    const n = Math.random();
    if (n > 0.5) {
      resolve("p1 resolve 结果:" + n);
    } else {
      reject("p1 reject 结果:" + n);
    }
  }, 900);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    const n = Math.random();
    if (n > 0.5) {
      resolve("p2 resolve 结果:" + n);
    } else {
      reject("p2 reject 结果:" + n);
    }
  }, 600);
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    const n = Math.random();
    if (n > 0.5) {
      resolve("p3 resolve 结果:" + n);
    } else {
      reject("p3 reject 结果:" + n);
    }
  }, 1300);
});

// Promise.resolve(p1)
//   .then((res) => {
//     console.log("Promise.resolve(p1)", res);
//   })
//   .catch((e) => {
//     console.log("eee", e);
//   });
// // Promise.race([p1, p2, p3])
// //   .then((res) => {
// //     console.log("race", res);
// //   })
// //   .catch((err) => {
// //     console.log("race", err);
// //   });

Promise.all([p1, p2, p3])
  .then((res) => {
    console.log(`all res`, res);
  })
  .catch((err) => {
    console.log(err);
  });

Promise.resolve({ a: "aaaaaaaaaa" }).then((res) => {
  console.log("a", res);
});
