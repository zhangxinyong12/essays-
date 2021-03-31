function memorize(a, b) {
  if (memorize.a === a && memorize.b === b && memorize.result !== undefined) {
    return memorize.result;
  }
  memorize.a = a;
  memorize.b = b;
  const result = a.toString() + b.toString();
  memorize.result = result;
  console.log(a, b, "执行toString 逻辑");
  return result;
}

memorize(1, 2);
memorize(1, 2);
memorize({}, {});
memorize({}, {});
memorize({}, {});
memorize({}, {});
