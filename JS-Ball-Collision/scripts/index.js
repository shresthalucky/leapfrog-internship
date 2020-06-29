function init() {
  var canvas = document.getElementById('main-canvas');

  var ctx = canvas.getContext('2d');
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;

  var CANVAS_WIDTH = canvas.width;
  var CANVAS_HEIGHT = canvas.height;

  var MIN_RADIUS = 5;
  var MAX_RADIUS = 10;
  var TOTAL_BALLS = 50;

  var ballsList = generateBalls(TOTAL_BALLS);

  function generateBalls() {
    var ballsList = [];

    for (let i = 0; i < TOTAL_BALLS; i++) {
      var x, y, radius, ball;
      var exists = true;

      while (exists === true) {
        var [x, y, radius] = generateValues();
        ball = new Ball(x, y, radius, i);

        if (i === 0) break;

        for (let j = 0; j < ballsList.length; j++) {
          var distance = ball.getDistance(ballsList[j]);
          if (distance > ball.radius + ballsList[j].radius) {
            if (j === ballsList.length - 1) {
              exists = false;
            }
            continue;
          }
          break;
        }
      }
      ballsList.push(ball);
    }

    return ballsList;
  }

  function generateValues() {
    var radius = Math.floor(Math.random() * MAX_RADIUS) + MIN_RADIUS;
    var x = Math.floor(Math.random() * (CANVAS_WIDTH - MAX_RADIUS)) + radius;
    var y = Math.floor(Math.random() * (CANVAS_HEIGHT - MAX_RADIUS)) + radius;
    return [x, y, radius];
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (ball of ballsList) {
      ball.checkCollision(ballsList);
      ball.move(CANVAS_WIDTH, CANVAS_HEIGHT);
      ball.draw(ctx);
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

}

init();