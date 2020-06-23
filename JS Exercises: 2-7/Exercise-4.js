function searchByName(listOfFruits, fruitName) {

  for (var i in listOfFruits) {
    if (listOfFruits[i].name.toLowerCase() === fruitName.toLowerCase()) {
      return listOfFruits[i];
    }
  }
  return 'Fruit Not Found';
}

function searchByKey(listOfFruits, key, query) {

  for (var i in listOfFruits) {
    var value = listOfFruits[i][key]

    if (key !== 'id') {
      value = value.toLowerCase()
    }

    if (value === query) {
      return listOfFruits[i];
    }
  }
  return 'Fruit Not Found';

}

var fruits = [
  { id: 1, name: 'Banana', color: 'Yellow' },
  { id: 2, name: 'Apple', color: 'Red' }
]

console.log(searchByName(fruits, 'apple'));

console.log(searchByKey(fruits, 'name', 'apple'));

