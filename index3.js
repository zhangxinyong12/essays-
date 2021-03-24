class Cat {
  constructor() {}
  static init() {
    if (!this.instance) {
      this.instance = new Cat();
    }
    return this.instance;
  }
  a(name) {
    console.log("a", name);
    return this;
  }
  b(name) {
    console.log("b", name);
    return this;
  }
}

var a = Cat.init().a("aa").b("bb");
var b = Cat.init().a("aa").b("bb");
console.log(a === b); // true
