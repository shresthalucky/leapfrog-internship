function normalize(object) {

  var result = {}

  function children(childrenArray) {
    childrenArray.forEach(function (person) {
      var obj = {};
      obj['id'] = person.id;
      obj['name'] = person.name;

      result[person.id] = obj;

      if (person.children) {
        result[person.id]['children'] = (person.children).map(function (child) {
          return child.id;
        });
        children(person.children);
      }
    });
  }

  children(Object.values(object));

  return result;
}

var input = {
  '1': {
    id: 1,
    name: 'John',
    children: [
      { id: 2, name: 'Sally' },
      { id: 3, name: 'Mark', children: [{ id: 4, name: 'Harry' }] }
    ]
  },
  '5': {
    id: 5,
    name: 'Mike',
    children: [{ id: 6, name: 'Peter' }]
  }
};

console.log(normalize(input));