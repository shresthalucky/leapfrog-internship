function init() {
  var canvas = document.getElementById('main-canvas');

  var ctx = canvas.getContext('2d');
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;

  var CANVAS_WIDTH = canvas.width;
  var CANVAS_HEIGHT = canvas.height;

  var MIN_WIDTH = 25;
  var MAX_WIDTH = 32;
  var HEIGHT = 39;
  var TOTAL_ANTS = 25;

  var antsList = generateAnts(TOTAL_ANTS);

  var score = 0;

  function generateAnts() {
    var antsList = [];

    for (let i = 0; i < TOTAL_ANTS; i++) {
      var x, y, width, height, ant;
      var exists = true;

      while (exists === true) {
        var [x, y, width, height] = generateValues();
        ant = new Ant(x, y, width, height);

        if (i === 0) break;

        for (let j = 0; j < antsList.length; j++) {

          pastAnt = antsList[j];

          if (ant.x < pastAnt.x + pastAnt.width &&
            ant.x + ant.width > pastAnt.x &&
            ant.y < pastAnt.y + pastAnt.height &&
            ant.y + ant.height > pastAnt.y) {
            break;
          } else {
            if (j === antsList.length - 1) {
              exists = false;
            }
            continue;
          }
        }
      }
      antsList.push(ant);
    }

    return antsList;
  }

  function generateValues() {
    var width = Math.floor(Math.random() * MAX_WIDTH) + MIN_WIDTH;
    var height = (HEIGHT / MAX_WIDTH) * width;
    var x = Math.floor(Math.random() * (CANVAS_WIDTH - MAX_WIDTH)) + width;
    var y = Math.floor(Math.random() * (CANVAS_HEIGHT - MAX_WIDTH)) + height;
    return [x, y, width, height];
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (antsList.length === 0) {
      displayGameOver();
    } else {
      for (ant of antsList) {
        ant.checkCollision(antsList);
        ant.move(CANVAS_WIDTH, CANVAS_HEIGHT);
        ant.draw(ctx);
      }
      displayScore();
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  canvas.addEventListener('click', function (event) {
    var x = event.clientX;
    var y = event.clientY;

    for (let i = 0; i < antsList.length; i++) {
      var ant = antsList[i];
      if (x >= ant.x
        && x <= ant.x + ant.width
        && y >= ant.y
        && y <= ant.y + ant.height
      ) {
        antsList.splice(i, 1);
        score++;
      }
    }
  });

  function displayScore() {
    ctx.font = 'bold 20px Arial';
    ctx.fillText('ANT SMASHER', 10, 40);
    ctx.fillText(`SCORE: ${score}`, 10, 70);
  }

  function displayGameOver() {
    ctx.font = 'bold 30px Arial';
    ctx.fillStyle = "#ff0057";
    ctx.fillText(`ALL ANTS SMASHED`, CANVAS_WIDTH / 2 - 80, CANVAS_HEIGHT / 2 - 40);
    ctx.fillText(`SCORE: ${score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
  }
}

init();