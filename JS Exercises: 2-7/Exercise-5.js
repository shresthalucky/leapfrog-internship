function transform(collection, tranFunc) {
  result = [];
  for (i in collection) {
    result.push(tranFunc(collection[i]));
  }
  return result;
}

var numbers = [1, 2, 3, 4];

var double = transform(numbers, function (num) {
  return num * 2;
})

console.log(double);
