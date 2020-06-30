var Ball = function (x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.dx = Math.random() < 0.5 ? 1 : -1;
  this.dy = Math.random() < 0.5 ? 1 : -1;

  this.color = generateColor();

  function generateColor() {

    var red = Math.floor(Math.random() * 255);
    var green = Math.floor(Math.random() * 255);
    var blue = Math.floor(Math.random() * 255);

    return `rgb(${red}, ${green}, ${blue})`;
  }

  this.draw = (ctx) => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  this.move = (width, height) => {

    var surfaceX = width - this.radius;
    var surfaceY = height - this.radius;

    if (this.x >= surfaceX || this.x < this.radius) {
      this.dx *= -1;
    }

    if (this.y >= surfaceY || this.y < this.radius) {
      this.dy *= -1;
    }

    this.x += this.dx;
    this.y += this.dy;
  }

  this.checkCollision = (ballsList) => {
    for (let i = 0; i < ballsList.length; i++) {
      if (ballsList[i] === this) continue;

      var distance = this.getDistance(ballsList[i]);

      if (distance <= ballsList[i].radius + this.radius) {
        this.changeDirection();
        ballsList[i].changeDirection();
      }
    }
  }

  this.changeDirection = () => {
    this.dx *= -1;
    this.dy *= -1;
  }

  this.getDistance = (ball) => {
    var dx = this.x - ball.x;
    var dy = this.y - ball.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}