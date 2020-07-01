const Obstacle = function (startPosition, width, height) {
  this.width = width;
  this.height = height;
  this.position = {
    'start': startPosition,
    'end': new Position(startPosition.x + this.width, startPosition.y + this.height)
  }
  this.active = true;
  this.img = opponentImages[Math.floor(Math.random() * 3)];

  this.draw = (ctx) => {
    ctx.drawImage(this.img, this.position.start.x, this.position.start.y, this.width, this.height);
  }

  this.moveDown = (ctxHeight) => {
    if (this.active) {
      this.position.start.y += Game.speed;
      this.position.end.y += Game.speed;
      updateScore(ctxHeight);
    }
  }

  const updateScore = (ctxHeight) => {
    if (this.position.start.y >= ctxHeight) {
      this.active = false;
      Game.increaseScore();
    }
  }

  this.deactivate = () => {
    this.active = false;
  }

}