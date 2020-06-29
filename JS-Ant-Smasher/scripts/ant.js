var Ant = function (x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.dx = Math.random() < 0.5 ? 1 : -1;
  this.dy = Math.random() < 0.5 ? 1 : -1;

  this.draw = (ctx) => {
    var img = new Image();
    img.src = './images/ant.png'
    ctx.drawImage(img, this.x, this.y, this.width, this.height);
  }

  this.move = (width, height) => {

    var surfaceX = width - this.width;
    var surfaceY = height - this.height;

    if (this.x >= surfaceX || this.x < 0) {
      this.dx *= -1;
    }

    if (this.y >= surfaceY || this.y < 0) {
      this.dy *= -1;
    }

    this.x += this.dx;
    this.y += this.dy;
  }

  this.checkCollision = (antsList) => {
    for (let i = 0; i < antsList.length; i++) {
      var ant = antsList[i];
      if (ant === this) continue;

      if (this.x < ant.x + ant.width &&
        this.x + this.width > ant.x &&
        this.y < ant.y + ant.height &&
        this.y + this.height > ant.y
      ) {
        this.changeDirection();
        ant.changeDirection();
      }
    }
  }

  this.changeDirection = () => {
    this.dx *= -1;
    this.dy *= -1;
  }
}