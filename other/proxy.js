const a = {
    name: 'zhangsan'
}
Object.defineProperty(a, 'name', {
    set: (val) => {
        console.log('set');
        return val;
    },
    get: (val) => {
        console.log('get');
        return 'a.name';
    }
});
console.log(a.name);
a.name = '3'

const p = new Proxy({
    a: 1,
    b: 2,
}, {
    get: function (obj, value) {
        console.log('get', obj, value);
        return Reflect.get(obj, value);
    },
    set: function (obj, prop, value) {
        console.log('set', obj, prop, value);
        return Reflect.set(obj, prop, value);
    },
})

p.xx = 'aaaaaa'