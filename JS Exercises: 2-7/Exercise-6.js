function compareName(name1, name2) {
  var name1 = name1.toLowerCase();
  var name2 = name2.toLowerCase();

  if (name1 < name2) {
    return -1;
  } else if (name1 > name2) {
    return 1;
  } else {
    return 0;
  }
}

function sortBy(array, key) {

  // clone array to list variable
  var list = array.map(function (val) {
    return val;
  });

  if (key === 'id') {
    list.sort(function (obj1, obj2) {
      // return positive, negative or zero integer
      return obj1.id - obj2.id;
    });

  } else if (key === 'name') {

    list.sort(function (obj1, obj2) {
      return compareName(obj1.name, obj2.name);
    });
  }

  return list;
}

var arr = [{
  id: 1,
  name: 'John',
}, {
  id: 2,
  name: 'Mary',
}, {
  id: 3,
  name: 'Andrew',
}, {
  id: 5,
  name: 'Dan'
}, {
  id: 4,
  name: 'Kyle'
}];


var sortedByName = sortBy(arr, 'name');
var sortedById = sortBy(arr, 'id');

console.log('sorted by name: ', sortedByName);
console.log('sorted by id: ', sortedById);
console.log('original array:', arr);