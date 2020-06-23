function renderPattern(number) {
  
  // check if parameter is a number
  if (!Number.isNaN(number)) {
    var pattern = ''
    for (var i = number; i > 0; i--) {
      pattern += '*'.repeat(i) + '\n'
    }
    return pattern;
  }

  return 'Not A Number';
}

var numberOfAsterisks = prompt("How many asterisks on first row?");

console.log(renderPattern(parseInt(numberOfAsterisks)));