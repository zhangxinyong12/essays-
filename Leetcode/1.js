const str = 'abc';
const arr = str.split('');
let n = 0, m = arr.length - 1;
for (let i = 0; i < m; i++) {
    const a = arr[n];
    const b = arr[m]
    arr[n] = b;
    arr[m] = a;
    n++;
    m--
}
console.log(arr.join(''));